// routes/re_dashboard.routes.js
const express = require("express");

module.exports = () => {
  const voucherPage = require("../controllers/VoucherController/voucher.Controller");
  const retailerDashboard = require("../controllers/UserController/user.controller");
  const router = express.Router();

  // Retailer Dashboard Routes
  router.get("/dashboard", retailerDashboard.getRetailerDashboardData);
  router.post("/addvoucher", voucherPage.postCreateVoucher);  
  router.get("/voucherpage", voucherPage.getVoucherPage);


  return router;  // Return the router
};
