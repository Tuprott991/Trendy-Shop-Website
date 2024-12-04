const mongoose = require('mongoose');
const { Schema } = mongoose;

// Voucher Schema
const voucherSchema = new Schema({
  code: { type: String, required: true, unique: true },
  description: { type: String },
  discount_value: { type: Number, required: true },
  valid_from: { type: Date, required: true },
  valid_to: { type: Date, required: true },
  minimum_order_value: { type: Number, default: 0 },
  max_uses: { type: Number, default: 1 },
  used_count: { type: Number, default: 0 }
}, { timestamps: true });

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;