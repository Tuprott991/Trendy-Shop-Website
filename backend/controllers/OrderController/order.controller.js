const { User } = require("../../models/index");
const Order = require("../../models/index").Order;
const Product = require("../../models/index").Product;
const Voucher = require("../../models/index").Voucher;


exports.postCreateOrders = async (req, res) => {
  const { customer_id, product_list, voucher, name, address, city, phone, email, payment_method } = req.body

  try {
    // Lấy danh sách unique retailer_id
    const retailer_id_list = product_list.map((item) => item.user_id);
    const unique_retailer_id_list = [...new Set(retailer_id_list)];

    const unique_code = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Khởi tạo mảng lưu danh sách order được tạo
    const createdOrders = [];
    // console.log(product_list)

    // Duyệt qua từng retailer_id để tạo order
    for (const retailer_id of unique_retailer_id_list) {
      // Lọc sản phẩm thuộc retailer_id hiện tại
      // Ứng với mỗi retailer có trong product_list, ta đi lấy ra các items nào liên quan tới product đó
      const itemsForRetailer = product_list
        .filter((item) => item.user_id === retailer_id) 
        .map((item) => ({
          name: item.name,
          description: item.description,
          price: item.price,
          retailer_id: item.user_id,
          category_id: item.category_id,
          size: item.size,
          rating: item.rating,
          image_url: item.image_url,
          
          product_id: item._id,
          quantity: item.quantity,
        }));
        

      // Tính tổng tiền của order
      

      let vouchers = [];
      let useVoucher = 0;
      // Gán voucher nếu có
      if (voucher) {
        const validVoucher = await Voucher.findOne({ code: voucher.code, retailer_id });
        if (validVoucher) {
          useVoucher = 1;
          const now = new Date();
          if (validVoucher.valid_from <= now && validVoucher.valid_to >= now && 
              validVoucher.status &&  
              validVoucher.max_uses - validVoucher.used_count > 0) {

            vouchers.push({ voucher_code: validVoucher.code , discount_value: validVoucher.discount_value});
      
            // Update the used_count and save
            await Voucher.findByIdAndUpdate(validVoucher._id, {
              $inc: { max_uses: -1 },
            });

          } else {
            throw new Error(`Voucher is invalid or expired.`);
          }
        }
      }
      
      if (useVoucher && vouchers.length > 0) {
        total_money = itemsForRetailer.reduce((sum, item) => {
          return sum + item.price * item.quantity * (1 - vouchers[0].discount_value / 100);
        }, 0);
      } else {
        total_money = itemsForRetailer.reduce((sum, item) => {
          return sum + item.price * item.quantity;
        }, 0);
      }

      itemsForRetailer.map(async (item) => {  
        await Product.findByIdAndUpdate(item.product_id, {
          $inc: { stock_quantity: -item.quantity },
        });
    
      })

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
  catch (error) {
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
  console.log(req.params)
  try {
    customerOrder = await Order.getCustomerOrder(id)
    res.status(200).json({
      customerOrder,
    });
  }
  catch (error) {
    console.error('Error get orders information:', error);
    res.status(500).json({ message: 'Error getting orders information', error });
  }
}

exports.updateOrderStatus = async (req, res) => {
  const id = req.body.id, status = req.body.newStatus;
  try {
    updateOrderStatus = Order.updateStatus(id, status);
    res.status(200).json({
      updateOrderStatus,
    })
  }
  catch (error) {
    console.error('Error update status:', error);
    res.status(500).json({ message: 'Error  update status', error });
  }
}


