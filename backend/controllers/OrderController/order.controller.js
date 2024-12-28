const { User } = require("../../models/index");
const Order = require("../../models/index").Order;
const Product = require("../../models/index").Product;
const Voucher = require("../../models/index").Voucher;

exports.postAddOrder = async (req, res) => {
  const { id, status_order, address, phone, payment_method, items, voucher } = req.body;

  try {
    // Initialize an object to group items by retailer (user_id)
    const retailerItemsMap = {};

    // Iterate over items and fetch the user_id for each product
    for (let item of items) {
      // Look up the product by its product_id to get the user_id (retailer)
      const product = await Product.findOne({ _id: item.product_id }).select('user_id stock_quantity'); // Get user_id and stock_quantity of the product

      if (!product) {
        return res.status(404).json({ error: `Product with ID ${item.product_id} not found` });
      }

      const retailer_id = product.user_id;

      // Ensure stock is available for the order
      if (product.stock_quantity < item.quantity) {
        return res.status(400).json({ error: `Not enough stock for product ${item.product_id}` });
      }

      // Subtract the ordered quantity from stock_quantity
      product.stock_quantity -= item.quantity;

      // Save the updated product with the new stock_quantity
      await product.save();

      // Group items by retailer_id
      if (!retailerItemsMap[retailer_id]) {
        retailerItemsMap[retailer_id] = [];  // Initialize an empty array for this retailer
      }
      retailerItemsMap[retailer_id].push({
        product_id: item.product_id,
        quantity: item.quantity
      });
    }

    // For each retailer_id, create an order with corresponding products
    const createdOrders = [];

    for (let retailer_id in retailerItemsMap) {
      // Get the items for this retailer
      const retailerItems = retailerItemsMap[retailer_id];

      // Create the order for the retailer with their specific items
      const savedOrder = await Order.createOrder(
        retailer_id,
        total_money,
        status_order,
        address,
        phone,
        payment_method,
        retailerItems,
        vouchers
      );

      // Push the created order _id into the user's order_list
      const updatedUser = await User.findByIdAndUpdate(
        id, // Use the `id` from the request body to find the user
        { $push: { order_list: savedOrder._id } }, // Add the saved order _id to the order_list array
        { new: true } // Return the updated document
      );

      if (!updatedUser) {
        return res.status(404).json({ error: `User with ID ${id} not found` }); // If user not found, return an error
      }

      createdOrders.push(savedOrder); // Add the created order to the list
    }

    // Return the created orders
    return res.status(201).json({
      message: 'Orders created successfully',
      orders: createdOrders
    }); // Return the saved orders

  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ error: 'Failed to create orders' }); // Return error message
  }
};

exports.getOrderPage = async (req, res) => {
  const { id } = req.query;  // Assuming 'id' is a query parameter for retailer_id
  
  try {
    const orders = await Order.find({ retailer_id: id })  // Fetch orders for a specific retailer
      .populate('retailer_id', 'name email');  // Populate retailer details (name, email)

    const customerDetails = orders.map(order => ({
      name: order.retailer_id.name,    // Retailer name
      email: order.retailer_id.email,  // Retailer email
      address: order.address,          // Address from the order
      phone: order.phone,              // Phone from the order
      status: order.status,            // Status from the order (pending, completed)
    }));

    res.status(200).send({
      message: "Successfully fetched customers for orders",
      customers: customerDetails, // Include the customer details in the response
    });

  } catch (err) {
    res.status(500).send({ message: err.message || "Cannot find order." });
  }
};


exports.getUserOrder= async (req, res) => {
  const {id}=req.params;
  try{
    const orderData = await Order.getOrderUser(id);
    res.status(200).json({
      orderData,
    });
  }
  catch (error){
    console.error('Error get orders information:', error);
    res.status(500).json({ message: 'Error getting orders information', error });
  }
};

exports.postCreateOrders = async(req,res) =>{
  const {customer_id, product_list, voucher, name, address, city, phone, email, payment_method} = req.body

  try {
    // Lấy danh sách unique retailer_id
    const retailer_id_list = product_list.map((item) => item.user_id);
    const unique_retailer_id_list = [...new Set(retailer_id_list)];

    const unique_code = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Khởi tạo mảng lưu danh sách order được tạo
    const createdOrders = [];

    // Duyệt qua từng retailer_id để tạo order
    for (const retailer_id of unique_retailer_id_list) {
      // Lọc sản phẩm thuộc retailer_id hiện tại
      const itemsForRetailer = product_list
        .filter((item) => item.user_id === retailer_id)
        .map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        }));


      
      // Tính tổng tiền của order
      const total_money = itemsForRetailer.reduce((sum, item) => {
        const product = product_list.find((p) => p.product_id === item.product_id);
        return sum + product.price * item.quantity;
      }, 0);

      itemsForRetailer.forEach(item => {
        stock_quantity = Product.find({product_id: item.product_id})[0].stock_quantity
        Product.updateStockQuantity(item.product_id, stock_quantity - item.quantity)
      });	
      // Gán voucher nếu có
      let vouchers = [];
      if (voucher) {
        const validVoucher = await Voucher.findOne({ code: voucher, retailer_id });
        if (validVoucher) {
          vouchers.push({ voucher_code: validVoucher.code});
          Voucher.update(validVoucher.voucherID, 
            validVoucher.max_uses-1, 
            validVoucher.minimum_order_value, valid_from,
            validVoucher.valid_to, 
            validVoucher.description);
        }
      }
      
      const order = await Order.createOrder(
        customer_id,
        retailer_id,
        total_money,
        "pending",
        name,
        address,
        city,
        phone,
        email,
        payment_method,
        itemsForRetailer,
        vouchers,
        unique_code
      );
      createdOrders.push(order);
  }
  res.status(201).json({
    message: "Orders created successfully",
    orders: createdOrders,
  })
}
  catch (error){
    console.error("Error creating orders:", error);
    res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};

exports.getOrderviewPage = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) {
      return res.status(400).send({ message: "Retailer ID is required." });
    }
    const existingRetailer = await User.findOne({ id, role: "retailer" });
    if (!existingRetailer) {
      return res.status(400).send({ message: "Retailer does not exist." });
    }
    const orders = await Order.find({ retailer_id: id })
    if (!orders.length) {
      return res.status(404).send({ message: "No orders found for this retailer." });
    }
    return res.status(200).json(orders);
  } catch (err) {
    res.status(500).send({
      message: err.message || "An error occurred while fetching the voucher page."
    });
  }
};

exports.getCustomerOrder = async (req, res) => {
  const { id } = req.params;
  try {
    customerOrder = Order.getCustomerOrder(id)

    res.status(200).json({
      customerOrder,
    });
  }
  catch (error) {
    console.error('Error get orders information:', error);
    res.status(500).json({ message: 'Error getting orders information', error });
  }
}


exports.updateOrderStatus = async(req,res) =>{
  const {id, status} = req.params

  try{
    updateOrderStatus = Order.updateStatus(id, status);
    res.status(200).json({
      updateOrderStatus,
    })
  }
  catch (error){
    console.error('Error update status:', error);
    res.status(500).json({ message: 'Error  update status', error });
  }
}


