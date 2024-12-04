// routes/re_dashboard.routes.js
const express = require("express");

module.exports = () => {
  const ad_dasController = require("../controllers/UserController/re_dashboard.controllers.js");
  const router = express.Router();

  // Retailer Dashboard Routes
  router.get("/dashboard", ad_dasController.getDashboardData);
  router.post("/product", ad_dasController.addProduct);
  router.put("/product/:id", ad_dasController.updateProduct);
  router.delete("/product/:id", ad_dasController.deleteProduct);
  router.get("/product/:id", ad_dasController.getProductDetails);

  return router;  // Return the router
};
