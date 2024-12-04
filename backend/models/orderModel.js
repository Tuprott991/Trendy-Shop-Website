const mongoose = require('mongoose');
const { Schema } = mongoose;

// Order Schema
const orderSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  total_amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  address: { type: String },
  phone: { type: String },
  payment_method: { type: String, enum: ['credit_card', 'cash', 'paypal'], required: true },
  items: [
    {
      product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    }
  ],
  vouchers: [
    {
      voucher_code:{ type: String, ref: 'Voucher', required: false },
    }
  ]
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
