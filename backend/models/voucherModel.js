const mongoose = require('mongoose');
const { Schema } = mongoose;

// Voucher Schema
const voucherSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    description: { type: String },
    retailer_id: {type: Schema.Types.ObjectId, ref: 'User', required: true },
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
  async getAllRetailVoucher(){
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
  },
  async update(voucherID, max_uses) {
    const updateData = {};
    if (max_uses) updateData.max_uses = max_uses;
    // Tìm kiếm và cập nhật người dùng trong database

    const voucheredUser = await this.findByIdAndUpdate(
      voucherID,
      { $set: updateData },
      { new: true, runValidators: true } // Trả về tài liệu đã được cập nhật và áp dụng validate
    );

     // Nếu không tìm thấy user, báo lỗi
    if (!voucheredUser) {
      throw new Error("User not found");
    }
    return voucheredUser
  },

  async delete(voucherID){
    try {
      // Kiểm tra xem userID có được cung cấp không
      if (!voucherID) {
        throw new Error("VoucherID is required");
      }
  
      // Tìm và xóa người dùng trong cơ sở dữ liệu
      const deletedVoucher = await this.findByIdAndDelete(voucherID);
  
      // Nếu không tìm thấy user, báo lỗi
      if (!deletedVoucher) {
        throw new Error("Voucher not found");
      }
  
      // Trả về thông báo thành công hoặc dữ liệu user đã xóa
      return { message: "Voucher deleted successfully", user: deletedVoucher };
    } catch (error) {
      throw new Error(`Failed to delete voucher: ${error.message}`);
    }
  }
};

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;
