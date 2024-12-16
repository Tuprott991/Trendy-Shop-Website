// routes/re_dashboard.routes.js
const express = require("express");
const authenticateToken = require("../middleware")

module.exports = () => {
  const voucherPage = require("../controllers/VoucherController/voucher.Controller");
  const retailerDashboard = require("../controllers/UserController/user.controller");
  const productPage = require("../controllers/ProductController/product");
  const orderPage = require("../controllers/OrderController/order.controller");
  const router = express.Router();

  // Retailer Dashboard Routes
  router.get("/dashboard/:id",authenticateToken, retailerDashboard.getRetailerDashboardData);
  router.post("/addproduct", productPage.importProduct);
  router.post("/addvoucher", voucherPage.postCreateVoucher);  
  router.get("/voucherpage/:id", voucherPage.getVoucherPage);
  router.get("/orderpage/:id",orderPage.getOrderPage);


  return router;  // Return the router
};
