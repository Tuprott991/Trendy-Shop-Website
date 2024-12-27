const mongoose = require('mongoose');
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  customer_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Customer who is giving the feedback
  retailer_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Retailer
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, // The product being reviewed
  rating: { type: Number, required: true, min: 1, max: 5 }, // Rating between 1 and 5
  comment: { type: String, maxlength: 500 }, // Optional comment
  created_at: { type: Date, default: Date.now }, // Time the feedback was submitted
}, {
  timestamps: true,
  statics: {
    // Tạo feedback mới, lưu lại lên database
    async createFeedBack(customer_id, retailer_id, product_id, rating, comment) {
      try {
        const feedback = await this.create({
          customer_id,
          retailer_id,
          product_id,
          rating,
          comment,
          created_at: new Date()
        });
        return feedback;
      } catch (error) {
        throw new Error(`Error creating feedback: ${error.message}`);
      }
    },

    // Lấy thông tin của feedback trên dtb theo product_id để hiển thị trên trang product
    async getFeedBackInformation(product_id) {
      try {
        const feedbacks = await this.find({ product_id })
          .populate('customer_id', 'name') // Chỉ lấy trường 'name' của khách hàng
          .populate('retailer_id', 'name') // Chỉ lấy trường 'name' của nhà bán lẻ
          .sort({ created_at: -1 }); // Sắp xếp theo thời gian tạo, mới nhất trước
        return feedbacks;
      } catch (error) {
        throw new Error(`Error retrieving feedbacks: ${error.message}`);
      }
    }
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);