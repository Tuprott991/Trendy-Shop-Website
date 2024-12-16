const { User } = require("../../models/index");

const Order = require("../../models/index").Order;




exports.getReDashBoard = async (req, res) => {
    const { id } = req.query;
  
    try {
        orders = User.countOrders(id);
        delivered = User.countDeliveredOrders(id);        
        revenue = User.calculateRevenue(id);

      res.status(201).send({ message: "User registered successfully", numOrders: orders, numDelivered: delivered, totalRevenue: revenue});
    } catch (err) {
      res.status(500).send({ message: err.message || "Signup error." });
    }
};

exports.postAddOrder = async (req, res) => {
  const { retailer_id, total_money, status_order, address, phone, payment_method, items, vouchers } = req.body;
  try {
    const savedOrder = await Order.creatOrder(retailer_id, total_money, status_order, address, phone, payment_method, items, vouchers);
    return res.status(201).json(savedOrder); // Trả lại kết quả
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ error: 'Failed to create order' }); // Trả về lỗi
  }
};

exports.getOrderPage = async (req, res) => {
  const { id } = req.query;  // Assuming 'id' is a query parameter for retailer_id
  
  try {
    // Step 1: Fetch orders for the retailer (fetching all orders for the given retailer)
    const orders = await Order.find({ retailer_id: id })  // Fetch orders for a specific retailer
      .populate('retailer_id', 'name email');  // Populate retailer details (name, email)

    // Step 2: Extract necessary details (including phone, address, and status from the orders)
    const customerDetails = orders.map(order => ({
      name: order.retailer_id.name,    // Retailer name
      email: order.retailer_id.email,  // Retailer email
      address: order.address,          // Address from the order
      phone: order.phone,              // Phone from the order
      status: order.status,            // Status from the order (pending, completed)
    }));

    // Step 3: Respond with the customer details
    res.status(200).send({
      message: "Successfully fetched customers for orders",
      customers: customerDetails, // Include the customer details in the response
    });

  } catch (err) {
    res.status(500).send({ message: err.message || "Cannot find order." });
  }
};




