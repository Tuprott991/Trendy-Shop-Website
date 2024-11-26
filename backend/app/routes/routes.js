module.exports = app => {
  const authController = require("../controllers/auth.controller.js");
  const retailer_dashboardController = require("../controllers/retailer/dashboard.controllers.js");
  const retailer_orderController = require("../controllers/retailer/order.controllers.js");
  const retailer_voucherController = require("../controllers/retailer/voucher.controllers.js");
  const router = require("express").Router();

  // Authentication Routes
  router.post("/auth/signup", authController.signup);
  router.post("/auth/login", authController.login);

  // Retailer dashboard Routes
  router.get('/dashboard', retailDashboardController.getDashboardData);
  router.post('/product', retailDashboardController.addProduct);
  router.put('/product/:id', retailDashboardController.updateProduct);
  router.delete('/product/:id', retailDashboardController.deleteProduct);
  router.get('/product/:id', retailDashboardController.getProductDetails);
  
  // Retailer order Routes
  router.get("/retailer/:id/order",retailer_orderController.);
  // Retailer voucer Routes
  router.get("/retailer/:id/voucher",retailer_voucherController.);

  // Mount the router to `/api`
  app.use("/api", router);
};
