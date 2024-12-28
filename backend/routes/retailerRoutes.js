// routes/re_dashboard.routes.js
const express = require("express");
const authenticateToken = require("../middleware");

module.exports = () => {
 const voucherPage = require("../controllers/VoucherController/voucher.Controller");
 const retailerDashboard = require("../controllers/UserController/user.controller");
 const productPage = require("../controllers/ProductController/product");
 const router = express.Router();

 // Retailer Dashboard Routes
 router.get(
  "/dashboard",
  authenticateToken,
  retailerDashboard.getRetailerDashboardData
 );
 router.post("/addproduct", authenticateToken, productPage.importProduct);
 router.post("/deleteproduct", authenticateToken, productPage.postDeleteProduct);

 router.post("/addvoucher", authenticateToken, voucherPage.postCreateVoucher);
 router.get("/voucher", authenticateToken, voucherPage.getVoucherPage);
 router.post("/deletevoucher", authenticateToken, voucherPage.postDeleteVoucher);

 // router.get("/order",authenticateToken,orderPage.getOrderPage);

 return router; // Return the router
};
