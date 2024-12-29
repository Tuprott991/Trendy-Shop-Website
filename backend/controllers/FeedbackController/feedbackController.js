const Feedback = require("../../models/feedbackModel");
const Product = require("../../models/productModel");
// exports.createFeedback = async (req, res) => {
//     try{
//         const {product_id}= req.product;
//         const{retailer_id}= req.retailer;
//         const {name,contact,email,rating,comment,}
//     }

exports.getProductFeedback = async (req, res) => {
 try {
  const { id } = req.params;
  console.log(id);
  const feedbacks = await Feedback.getProductFeedback(id);

  res.status(200).json({
   feedbacks,
  });
 } catch (error) {
  console.error("Error getting feedback:", error);
  res.status(500).json({ message: "Error getting feedback", error });
 }
};

exports.postProductFeedback = async (req, res) => {
 try {
  const { customer_id, product_id, name, contact, email, rating, comment } =
   req.body;
  const product_info = await Product.GetProductInfo(product_id);
  const retailer_id = product_info.user_id;
  const feedback = await Feedback.create({
   customer_id,
   product_id,
   retailer_id,
   name,
   contact,
   email,
   rating,
   comment,
  });
  res.status(200).json({
   message: "Feedback created successfully",
   feedback,
  });
 } catch (error) {
  console.error("Error creating feedback:", error);
  res.status(500).json({ error: "Failed to create feedback" });
 }
 exports.getAll
};
