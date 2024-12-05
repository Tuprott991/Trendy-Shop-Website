const mongoose = require('mongoose');
const { Schema } = mongoose;

// Voucher Schema
const voucherSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    description: { type: String },
    discount_value: { type: Number, required: true },
    valid_from: { type: Date, required: true },
    valid_to: { type: Date, required: true },
    minimum_order_value: { type: Number, default: 0 },
    max_uses: { type: Number, default: 1 },
    used_count: { type: Number, default: 0 },
    status: { type: Boolean, default: 1}
  },
  {
    timestamps: true
  }
);

// Adding a static method to the schema
voucherSchema.statics = {
  async getAll() {
    // Retrieve all categories
    const vouchers = await Voucher.find();
    const filteredVouchers = vouchers.filter((voucher) => voucher.isActive);
    // Return the filtered categories
    return filteredVouchers
  },
  async isActive() {
    const now = new Date();
  
    // Kiểm tra ngày hết hạn
    const isNotExpired = !this.valid_to || this.valid_to > now;
  
    // Cập nhật trạng thái nếu cần
    if (this.status !== (isNotExpired ? 1 : 0)) {
      this.status = isNotExpired ? 1 : 0;
      await this.save(); // Lưu lại thay đổi
    }
  }
};

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;
