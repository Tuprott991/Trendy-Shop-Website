// routes/re_dashboard.routes.js
const express = require("express");
const authenticateToken = require("../middleware");

module.exports = () => {
 const voucherPage = require("../controllers/VoucherController/voucher.Controller");
 const retailerDashboard = require("../controllers/UserController/user.controller");
 const productPage = require("../controllers/ProductController/product");
 const orderPage = require("../controllers/OrderController/order.controller");
 const router = express.Router();

 // Retailer Dashboard Routes
 router.get(
  "/dashboard",
  authenticateToken,
  retailerDashboard.getRetailerDashboardData
 );
 router.post("/addproduct", authenticateToken, productPage.importProduct);
 router.post("/deleteproduct", productPage.postDeleteProduct);

 router.post("/addvoucher", authenticateToken, voucherPage.postCreateVoucher);
 router.get("/voucher", authenticateToken, voucherPage.getVoucherPage);
 router.post("/deletevoucher", voucherPage.postDeleteVoucher);
<<<<<<< HEAD
=======
 router.post("/updatevoucher", voucherPage.postUpdateVoucher);
>>>>>>> 1300e54f1f44dd94ad4ef65631854e79e54d78ae

 // router.get("/order",authenticateToken,orderPage.getOrderPage);

 return router; // Return the router
};
