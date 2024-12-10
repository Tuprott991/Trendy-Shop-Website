const Order = require("../../models/index").Order;

exports.getReDashBoard = async (req, res) => {
    const { id } = req.body;
  
    try {
        orders = User.countOrders(id);
        delivered = User.countDeliveredOrders(id);        
        revenue = User.calculateRevenue(id);

      res.status(201).send({ message: "User registered successfully", numOrders: orders, numDelivered: delivered, totalRevenue: revenue});
    } catch (err) {
      res.status(500).send({ message: err.message || "Signup error." });
    }
};







