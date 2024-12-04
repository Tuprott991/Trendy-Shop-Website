const User = require('../../models').User;
const Product = require('../../models').Product

exports.getDashboardData = async (req, res) => {
    try {
      // Fetch total products
      const range = await User.countDocuments();

      // Loop User['Retailer'] += 1 


      // Fetch total orders
      const totalOrders = await Order.countDocuments(); // -> Total Delieved 
  
      // Fetch total delivered orders
      const totalDelivered = await Order.countDocuments({ status: 'completed' }); // -> Delieved 
  
      // Calculate total revenue
      const orders = await Order.find({ status: 'completed' });
      const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
  
      // Fetch product list
      const products = await Product.find().populate('category_id', 'name');
  
      // Format product list
      const productList = products.map(product => ({
        name: product.name,
        category: product.category_id.name,
        sizes: ['S', 'M', 'L'], // Assuming these are the default sizes
        cost: `$${product.price}`, // Format cost
        productId: product._id
      }));
  
      // Send the response
      res.json({
        totalProducts,
        totalOrders,
        totalDelivered,
        totalRevenue,
        products: productList
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching dashboard data' });
    }
  };
