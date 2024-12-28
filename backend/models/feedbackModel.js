const mongoose = require('mongoose');
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  customer_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Customer who is giving the feedback
  retailer_id: {type: Schema.Types.ObjectId, ref: 'User', required: true}, // Retailer
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, // The product being reviewed
  rating: { type: Number, required: true, min: 1, max: 5 }, // Rating between 1 and 5
  name: { type: String, required: true }, // Name of the customer
  contact: { type: String, required: true }, // Contact of the customer
  email: { type: String, required: true }, // Email of the customer
  comment: { type: String, maxlength: 500 }, // Optional comment
  created_at: { type: Date, default: Date.now }, // Time the feedback was submitted
}, 
{
   timestamps: true ,
    statics: {
    async getProductFeedback(productID) {
      const feedbacks = await this.find({ product_id: productID });
      return feedbacks;
    }
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
