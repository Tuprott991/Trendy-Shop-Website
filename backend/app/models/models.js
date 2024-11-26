const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  password: { type: String, required: true },
  order_list: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  role: { type: String, enum: ['admin', 'customer', 'retailer'], default: 'customer' }
}, { timestamps: true });

// Category Schema
const categorySchema = new Schema({
  category: { type: String, required: true },
  target: {type: String, required: true}
}, { timestamps: true });

// Product Schema
const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },  
  category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  stock_quantity: { type: Number, default: 0 },
  image_url: { type: String }
}, { timestamps: true });

// Order Schema
const orderSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  total_amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'canceled'], default: 'pending' },
  address: { type: String },
  phone: { type: String },
  payment_method: { type: String, enum: ['credit_card', 'cash', 'paypal'], required: true },
  items: [
    {
      product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ]
}, { timestamps: true });

// Payment Schema
// const paymentSchema = new Schema({
//   order_id: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
//   payment_method: { type: String, enum: ['credit_card', 'cash', 'paypal'], required: true },
//   payment_status: { type: String, enum: ['success', 'failed'], default: 'failed' }
// }, { timestamps: true });

// Voucher Schema
const voucherSchema = new Schema({
  code: { type: String, required: true, unique: true },
  description: { type: String },
  discount_type: { type: String, enum: ['percentage', 'fixed_amount'], required: true },
  discount_value: { type: Number, required: true },
  valid_from: { type: Date, required: true },
  valid_to: { type: Date, required: true },
  minimum_order_value: { type: Number, default: 0 },
  max_uses: { type: Number, default: 1 },
  used_count: { type: Number, default: 0 }
}, { timestamps: true });

// Models
const User = mongoose.model('User', userSchema);
const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);
//const Payment = mongoose.model('Payment', paymentSchema);
const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = { User, Category, Product, Order, Voucher };