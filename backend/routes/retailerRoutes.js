// routes/re_dashboard.routes.js
const express = require("express");

module.exports = () => {
  const voucherPage = require("../controllers/VoucherController/voucher.Controller");
  const router = express.Router();

  // Retailer Dashboard Routes
  router.post("/addvoucher", voucherPage.postCreateVoucher);  
  router.get("/voucherpage", voucherPage.getVoucherPage);


  return router;  // Return the router
};
