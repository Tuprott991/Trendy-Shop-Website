const mongoose = require('mongoose');
const { Schema } = mongoose;


// Product Schema
const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  user_id: {type: Schema.Types.ObjectId, ref: 'User', required: true },
  category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  size: {type: String, required: false},
  stock_quantity: { type: Number, default: 0 },
  rating :{type: Number, default: 0.0, max: 5.0},
  image_url: { type: String }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;