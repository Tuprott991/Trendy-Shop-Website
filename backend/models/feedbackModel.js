const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = new Schema(
 {
  customer_id: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
  retailer_id: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
  product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true }, 
  rating: { type: Number, required: true, min: 1, max: 5 }, 
  name: { type: String, required: true }, 
  contact: { type: String, required: true }, 
  email: { type: String, required: true }, 
  comment: { type: String, maxlength: 500 }, 
 },
 {
  timestamps: true,
  statics: {
   async getProductFeedback(productID) {
    const feedbacks = await this.find({ product_id: productID });
    return feedbacks;
   },
   async getAverageRating(productID) {
    const feedbacks = await this.find({ product_id: productID });
    const totalFeedbacks = feedbacks.length;
    let totalRating = 0;
    feedbacks.forEach((feedback) => {
     totalRating += feedback.rating;
    });
    const averageRating = totalRating / totalFeedbacks;
    return averageRating;
  },
 }
});

module.exports = mongoose.model("Feedback", feedbackSchema);
