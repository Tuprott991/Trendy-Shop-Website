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
    timestamps: true,
    statics: {
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
    
      async updateVoucher(voucherID, code, discount_value, max_uses, minimum_order_value, valid_from, valid_to, description) {
        const updateData = {};
        if (code) updateData.code = code
        if (discount_value) updateData.discount_value = discount_value
        if (max_uses) updateData.max_uses = max_uses;
        if (valid_from) updateData.valid_from = valid_from;
        if (minimum_order_value) updateData.minimum_order_value = minimum_order_value;
        if (valid_to) updateData.valid_to = valid_to;
        if (description) updateData.description = description;
        const voucheredUser = await this.findByIdAndUpdate(
          voucherID,
          { $set: updateData },
          { new: true, runValidators: true }
        );
        if (!voucheredUser) {
          throw new Error("User not found");
        }
        return voucheredUser
      },
    

      async delete(voucherID){
        try {
          if (!voucherID) {
            throw new Error("VoucherID is required");
          }
      
          const deletedVoucher = await this.findByIdAndDelete(voucherID);
      
          if (!deletedVoucher) {
            throw new Error("Voucher not found");
          }
      
          return { message: "Voucher deleted successfully"};
        } catch (error) {
          throw new Error(`Failed to delete voucher: ${error.message}`);
        }
      }
    }
  }
);

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;
