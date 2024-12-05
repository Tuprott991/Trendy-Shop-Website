// routes/auth.routes.js
const express = require("express");

module.exports = () => {
  const CategoryController = require("../controllers/CategoryController/category.js");
  const ProductController = require("../controllers/ProductController/product.js");
  const router = express.Router();


  router.get("/search/:keyword", ProductController.SearchProduct);
  // Route to create a new category
  router.post("/create", CategoryController.createCate);

  // Route to get category ID by category and target
  router.post("/getId", CategoryController.getId);

  // Route to get all categories
  router.get("/all", CategoryController.getAllCategory);

  router.get("/search/category/:id", CategoryController.filterCategory);
  
  router.get("/product/detail/:id", ProductController.GetProductInfo);
  
  return router;  
};
