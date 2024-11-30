// routes/auth.routes.js
const express = require("express");

module.exports = () => {
  const CategoryController = require("../controllers/CategoryController/category.js");
  const router = express.Router();

  // Route to create a new category
  router.post("/create", CategoryController.createCate);

  // Route to get category ID by category and target
  router.post("/getId", CategoryController.getId);

  // Route to get all categories
  router.get("/all", CategoryController.getAllCategory);

  // Route to filter products by category ID
  router.post("/filter", CategoryController.filterCategory);


  return router;  // Return the router
};
