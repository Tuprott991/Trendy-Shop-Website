const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

// Initialize Mongoose
db.mongoose = mongoose;
db.url = dbConfig.url;

// Import models
const User = require("./userModel.js");
const Category = require("./categoryModel.js");
const Product = require("./productModel.js");
const Order = require("./orderModel.js");
const Voucher = require("./voucherModel.js");
const Feedback = require("./feedbackModel.js");

// Assign models to the `db` object
db.User = User;
db.Category = Category;
db.Product = Product;
db.Order = Order;
db.Voucher = Voucher;
db.Feedback = Feedback;

module.exports = db;
