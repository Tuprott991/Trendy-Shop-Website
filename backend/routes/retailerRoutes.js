// routes/re_dashboard.routes.js
const express = require("express");

module.exports = () => {
  const re_dasController = require("../controllers/UserController/re_dashboard.controllers.js");
  const router = express.Router();

  // Retailer Dashboard Routes
  router.get("/dashboard", re_dasController.getDashboardData);
  router.post("/product", re_dasController.addProduct);
  router.put("/product/:id", re_dasController.updateProduct);
  router.delete("/product/:id", re_dasController.deleteProduct);
  router.get("/product/:id", re_dasController.getProductDetails);

  return router;  // Return the router
};
