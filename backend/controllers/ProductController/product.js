const mongoose = require("mongoose");
const Product = require("../../models/index").Product;
const Category = require("../../models/index").Category;

exports.importProduct = async (req, res) => {
  try {
    const { id } = req.user;
    const {
      name,
      description,
      price,
      size,
      stock_quantity,
      image_url,
      category,
      target,
    } = req.body;
    const categoryDoc = await Category.getCategoryID(category, target);
    if (!categoryDoc) {
      return res.status(404).json({ message: "Category not found" });
    }
    const product = new Product({
      name,
      description,
      price,
      size,
      stock_quantity,
      image_url,
      user_id: mongoose.Types.ObjectId(id),
      category_id: mongoose.Types.ObjectId(categoryDoc._id),
    });
    await Product.SaveProduct(product);
    res.status(200).json({ message: "Products imported successfully!" });
  } catch (error) {
    console.error("Error importing products:", error);
    res.status(500).json({ message: "Error importing products", error });
  }
};

exports.getSearchProduct = async (req, res) => {
  try {
    const keyword = req.params.keyword || req.query.keyword || 'null';
    const sortBy = req.query.sortBy || 'null';
    const ascending = req.query.ascending === "true";
    if (keyword === 'null') {
      const productInfo = await Product.getAllProduct();
      return res.status(200).json({ productInfo });
    }
    if (sortBy === 'null') {
      const productInfo = await Product.SearchProduct(keyword);
      return res.status(200).json({ productInfo });
    } else if (sortBy === 'price' && !ascending) {
      const productInfo = await Product.SearchProduct(keyword);
      const productInfoSort = productInfo.sort((a, b) => b.price - a.price);
      return res.status(200).json({ productInfo: productInfoSort });
    } else if (sortBy === 'price' && ascending) {
      const productInfo = await Product.SearchProduct(keyword);
      const productInfoSort = productInfo.sort((a, b) => a.price - b.price);
      return res.status(200).json({ productInfo: productInfoSort });
    } else if (sortBy === 'rating' && !ascending) {
      const productInfo = await Product.SearchProduct(keyword);
      const productInfoSort = productInfo.sort((a, b) => b.rating - a.rating);
      return res.status(200).json({ productInfo: productInfoSort });
    } else if (sortBy === 'rating' && ascending) {
      const productInfo = await Product.SearchProduct(keyword);
      const productInfoSort = productInfo.sort((a, b) => a.rating - b.rating);
      return res.status(200).json({ productInfo: productInfoSort });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

exports.getProductInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const productInfo = await Product.GetProductInfo(id);
    res.status(200).json({
      productInfo,
    });
  } catch (error) {
    console.error("Error getting product info:", error);
    res.status(500).json({ message: "Error getting product info", error });
  }
};

exports.GetProductReview = async (req, res) => {
  try {
    const { id } = req.params;
    const productReview = await Product.GetProductReview(id);
    res.status(200).json({
      productReview,
    });
  } catch (error) {
    console.error("Error getting product review:", error);
    res.status(500).json({ message: "Error getting product review", error });
  }
};

exports.postDeleteProduct = async (req, res) => {
  const { id } = req.body;
  try {
    Product.delete(id);
    res.status(200).json({ message: "Delete succesful!" });
  } catch {
    console.error(error);
    res.status(500).json({ message: "Delete Error" });
  }
};

exports.postUpdateProduct = async (req, res) => {
  const {
    name, description, price, user_id, category_id, size, stock_quantity, rating, image_url
  } = req.body;
  try {
    const update = await Product.updProduct(req.body.id, name, description, price, user_id, category_id, size, stock_quantity, rating, image_url);
    res.status(200).json({ message: "Update successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update Error" });
  }
};

