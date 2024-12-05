const User = require('../../models/index').User;
const Order = require('../../models/index').Order;

exports.getDashboardData = async (req, res) => {
    try {
      // Fetch total products
      const retailerCount = await User.countDocuments({ role: 'retailer' });

      // Fetch total orders
      const totalOrders = await Order.countDocuments(); // -> Total orders
  
      // Fetch total delivered orders
      const totalDelivered = await Order.countDocuments({ status: 'completed' }); // -> Delieved 
  
      // Calculate total revenue

      const orders = await Order.find({ status: 'completed' }); // ID  -> Mảng

      // sum là giá trị tích lũy, order là currentValue khi lướt qua mảng, 0 là giá trị khởi tạo, đây là loop
      const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0); 

      // Send the response
      res.json({
        retailerCount,
        totalOrders,
        totalDelivered,
        totalRevenue,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching dashboard data' });
    }
  };
  
exports.getRetailerInfor = async (req, res) =>{
  try{
    const retailerInfo = await User.find({ role: 'retailer' });

    res.json({
      id: retailerInfo._id,
      name: retailerInfo.name,
      email: retailer.email,
      

    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
};

exports.updateReInfo = async (req, res) =>{
  try{
    const userID = req.query

    User.update(userID)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
};
