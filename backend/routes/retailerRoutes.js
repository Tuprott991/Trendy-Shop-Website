// routes/re_dashboard.routes.js
const express = require("express");
const authenticateToken = require("../middleware");

module.exports = () => {
    const voucherPage = require("../controllers/VoucherController/voucher.Controller");
    const retailerDashboard = require("../controllers/UserController/user.controller");
    const productPage = require("../controllers/ProductController/product");
    const orderPage = require("../controllers/OrderController/order.controller");
    
    const router = express.Router();

 router.get(
  "/dashboard",
  authenticateToken,
  retailerDashboard.getRetailerDashboardData
 );
    router.post("/addproduct", authenticateToken, productPage.importProduct);
    router.post("/deleteproduct", productPage.postDeleteProduct);
 // router.post("/updateproduct", productPage.updateProduct);
    router.post("/addvoucher", authenticateToken, voucherPage.postCreateVoucher);
    router.get("/voucher", authenticateToken, voucherPage.getVoucherPage);
    router.post("/deletevoucher", voucherPage.postDeleteVoucher);
    router.post("/updatevoucher", voucherPage.postUpdateVoucher);
    router.get("/order", authenticateToken, orderPage.getOrderviewPage);
    router.post("/updatestatus", orderPage.updateOrderStatus);

    return router;
};
