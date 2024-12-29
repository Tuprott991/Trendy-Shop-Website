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
                name: { type: String, required: true },
                description: { type: String },
                price: { type: Number, required: true },
                retailer_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
                category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
                size: { type: String, required: false },
                rating: { type: Number, default: 0.0, max: 5.0 },
                image_url: { type: String },
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
                    console.error("Error create information:", error);
                    throw new Error("failed to create orders");
                }
            },

            async updateStatus(userID, status) {
                try {
                    const updatedStatus = await this.findByIdAndUpdate(
                        userID,
                        { $set: {status} },
                        { new: true, runValidators: true }
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
                    return totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0;
                } catch (error) {
                    console.error("Error calculating revenue:", error);
                    throw new Error("Failed to calculate revenue");
                }
            },

            // async getCustomerOrder(userID) {
            //     try {
            //         const orders = await this.find({ customer_id: userID });
            //         if (orders.length === 0) {
            //             throw new Error("No orders found for this user");
            //         }
            
            //         // Nhóm các đơn hàng dựa trên unique_code
            //         const groupedOrders = orders.reduce((acc, order) => {
            //             const code = order.unique_code || "no_code";
            //             if (!acc[code]) {
            //                 acc[code] = {
            //                     ...order.toObject(), // Copy tất cả các trường từ đơn hàng
            //                     total_money: 0,
            //                     items: [],
            //                     vouchers: [],
            //                     retailer_id: [],
            //                 };
            //             }
            //             acc[code].total_money += order.total_money;
            
            //             acc[code].items.push(...order.items);
            
            //             // Gộp vouchers
            //             acc[code].vouchers.push(...order.vouchers);
            
            //             // Gộp retailer_ids (tránh trùng lặp)
            //             if (!acc[code].retailer_id.includes(order.retailer_id.toString())) {
            //                 acc[code].retailer_id.push(order.retailer_id.toString());
            //             }
            
            //             return acc;
            //         }, {});
            
            //         // Chuyển retailer_ids thành chuỗi phân cách bằng dấu "+"
            //         const mergedOrders = Object.values(groupedOrders).map(order => ({
            //             ...order,
            //             retailer_id: order.retailer_id.join(", "),
            //         }));
            
            //         return mergedOrders;
            //     } catch (error) {
            //         console.error("Error retrieving orders:", error);
            //         throw new Error("Failed to retrieve customer orders");
            //     }
            // }
            async getCustomerOrder(userID) {
                try {
                    const orders = await this.find({ customer_id: userID });
                    return orders;
                } catch (error) {
                    console.error("Error retrieving orders:", error);
                    throw new Error("Failed to retrieve customer orders");
                }
            },
            async deleteOrder(orderID) {
                try {
                    if (!orderID) {
                        throw new Error("OrderID is required");
                    }
                    const deletedOrder = await this.findByIdAndDelete(orderID);
                    if (!deletedOrder) {
                        throw new Error("Order not found");
                    }
                    return { message: "Order deleted successfully" };
                } catch (error) {
                    throw new Error(`Failed to delete order: ${error.message}`);
                }
            }
        },
    }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
