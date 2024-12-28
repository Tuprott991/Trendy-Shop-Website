const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
    {
        customer_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
        retailer_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
        total_money: { type: Number, required: true },
        status: { type: String, enum: ["pending", "deliveried"], default: "pending" },
        name: {type: String, require: true},
        address: { type: String },
        city: {type: String, require: true},
        phone: { type: String },
        email: {type: String},
        payment_method: { type: String, enum: ["bank", "cash"], required: true },
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
        unique_code: {type: String, required: false}
    },
    {
        timestamps: true,
        statics: {
            async createOrder(
                customer_id,   
                retailer_id,
                total_money,
                status,
                name,
                address,
                city,
                phone,
                email,
                payment_method,
                items,
                vouchers,
                unique_code
            ) {
                try {
                    const order = new this({
                        customer_id: customer_id,
                        retailer_id: retailer_id,
                        total_money: total_money,
                        status: status,
                        name: name,
                        address: address,
                        city: city,
                        phone: phone,
                        email: email,
                        payment_method: payment_method,
                        items: items,
                        vouchers: vouchers,
                        unique_code: unique_code
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
            async getCustomerOrder(userID) {
                try {
                    // Lấy tất cả các đơn hàng của người dùng với customer_id khớp userID
                    const orders = await this.find({ customer_id: userID });
            
                    if (orders.length === 0) {
                        throw new Error("No orders found for this user");
                    }
            
                    // Gộp các đơn hàng dựa trên unique_code
                    const groupedOrders = orders.reduce((acc, order) => {
                        const code = order.unique_code || "no_code"; // Dùng "no_code" nếu unique_code không tồn tại
                        if (!acc[code]) {
                            acc[code] = []; // Khởi tạo danh sách đơn hàng cho unique_code
                        }
                        acc[code].push(order); // Thêm đơn hàng vào nhóm tương ứng
                        return acc;
                    }, {});
            
                    return groupedOrders;
                } catch (error) {
                    console.error("Error retrieving orders:", error);
                    throw new Error("Failed to retrieve customer orders");
                }
            }
        },
    }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
