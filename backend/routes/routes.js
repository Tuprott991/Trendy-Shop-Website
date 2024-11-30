module.exports = app => {
  const authController = require("../controllers/UserController/auth.controller.js");
  const retailer_dashboardController = require("../controllers/UserController/re_dashboard.controllers.js");

  const router = require("express").Router();

  // Authentication Routes
  router.post("/auth/signup", authController.signup);
  router.post("/auth/login", authController.login);


  // Retailer dashboard Routes
  router.get('/dashboard', retailer_dashboardController.getDashboardData);
  router.post('/product', retailer_dashboardController.addProduct);
  router.put('/product/:id', retailer_dashboardController.updateProduct);
  router.delete('/product/:id', retailer_dashboardController.deleteProduct);
  router.get('/product/:id', retailer_dashboardController.getProductDetails);


  // Mount the router to `/api`
  app.use("/api", router);
};
