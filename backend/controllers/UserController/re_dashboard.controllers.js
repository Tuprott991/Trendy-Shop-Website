const Product = require('../../models').Product;
const Order = require('../../models').Order;

exports.getDashboardData = async (req, res) => {
  try {
    // Fetch total products
    const totalProducts = await Product.countDocuments();

    // Fetch total orders
    const totalOrders = await Order.countDocuments();

    // Fetch total delivered orders
    const totalDelivered = await Order.countDocuments({ status: 'completed' });

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

/**
 * Add a New Product
 */
exports.addProduct = async (req, res) => {
  const { name, description, price, category_id, stock_quantity, image_url } = req.body;
  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category_id,
      stock_quantity,
      image_url
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding product' });
  }
};

/**
 * Update a Product
 */
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating product' });
  }
};

/**
 * Delete a Product
 */
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting product' });
  }
};

/**
 * Get Product Details (View Action)
 */
exports.getProductDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id).populate('category_id', 'name');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching product details' });
  }
};
