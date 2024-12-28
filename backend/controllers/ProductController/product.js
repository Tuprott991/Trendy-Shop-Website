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
  const { keyword } = req.params;
  const productInfo = await Product.SearchProduct(keyword);
  res.status(200).json({
   productInfo,
  });
 } catch (error) {
  console.error("Error searching products:", error);
  res.status(500).json({ message: "Error searching products", error });
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
  console.log(id);
  const productReview = await Product.GetProductReview(id);
  res.status(200).json({
   productReview,
  });
 } catch (error) {
  console.error("Error getting product review:", error);
  res.status(500).json({ message: "Error getting product review", error });
 }
};

exports.postDeleteProduct = (req, res) => {
 const { id } = req.body;

 try {
  Product.delete(id);
  res.status(200).json({ message: "Delete succesful!" });
 } catch {
  console.error(error);
  res.status(500).json({ message: "Delete Error" });
 }
};
