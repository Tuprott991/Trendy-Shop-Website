// routes/re_dashboard.routes.js
const express = require("express");

module.exports = () => {
  const ad_dasController = require("../controllers/UserController/ad_dashboard.controllers.js");
  const router = express.Router();

  // Retailer Dashboard Routes
  router.get("/dashboard", ad_dasController.getDashboardData);

  return router;  // Return the router
};
