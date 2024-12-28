const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
 {
  retailer_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  total_money: { type: Number, required: true },
  status: { type: String, enum: ["pending", "deliveried"], default: "pending" },
  address: { type: String },
  phone: { type: String },
  payment_method: {
   type: String,
   enum: ["bank", "cash"],
   required: true,
  },
  items: [
   {
    product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
   },
  ],
  vouchers: [
   {
    voucher_code: { type: String, ref: "Voucher", required: false },
   },
  ],
 },
 {
  timestamps: true,
  statics: {
   async createOrder(
    retailer_id,
    total_money,
    status,
    address,
    phone,
    payment_method,
    items,
    vouchers
   ) {
    try {
     const order = new this({
      retailer_id: retailer_id,
      total_money: total_money,
      status: status,
      address: address,
      phone: phone,
      payment_method: payment_method,
      items: items,
      vouchers: vouchers,
     });
     const savedOrder = await order.save();
     return savedOrder;
    } catch (error) {
     console.error("Error get orders information:", error);
     throw new Error("failed to get orders information");
    }
   },

   async updateStatus(userID, status) {
    try {
     const statusData = {};
     const updatedStatus = await this.findByIdAndUpdate(
      userID,
      { $set: statusData },
      { new: true, runValidators: true } // Trả về tài liệu đã được cập nhật và áp dụng validate
     );
     if (!updatedStatus) {
      throw new Error("User not found");
     }
     return updatedStatus;
    } catch (error) {
     console.error("Error update order status:", error);
     throw new Error("failed to update order status");
    }
   },

   // Tổng số orders theo userID
   async orderInfo(userID) {
    try {
     const orderData = await this.find({
      retailer_id: mongoose.Types.ObjectId(userID),
     });
     return orderData;
    } catch (error) {
     console.error("Error get orders information:", error);
     throw new Error("failed to get orders information");
    }
   },

   async countOrders(userID) {
    try {
     const totalOrders = await this.countDocuments({
      retailer_id: mongoose.Types.ObjectId(userID),
     });
     return totalOrders;
    } catch (error) {
     console.error("Error counting orders:", error);
     throw new Error("Failed to count orders");
    }
   },

   // Tổng số delivered orders (completed) theo userID
   async countDeliveredOrders(userID) {
    try {
     const deliveredOrders = await this.countDocuments({
      retailer_id: mongoose.Types.ObjectId(userID),
      status: "completed",
     });
     return deliveredOrders;
    } catch (error) {
     console.error("Error counting delivered orders:", error);
     throw new Error("Failed to count delivered orders");
    }
   },

   // Tính revenue dựa trên total_money của những order completed
   async calculateRevenue(userID) {
    try {
     const totalRevenue = await this.aggregate([
      {
       $match: {
        retailer_id: mongoose.Types.ObjectId(userID),
        status: "completed",
       },
      },
      {
       $group: {
        _id: null,
        totalRevenue: { $sum: "$total_money" },
       },
      },
     ]);

     // Nếu không có kết quả, trả về 0
     return totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0;
    } catch (error) {
     console.error("Error calculating revenue:", error);
     throw new Error("Failed to calculate revenue");
    }
   },
  },
 }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
