const mongoose = require('mongoose');
const { Schema } = mongoose;


// Category Schema
const categorySchema = new Schema({
  category: { type: String, required: true },
  target: {type: String, required: true}
}, { timestamps: true });
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;