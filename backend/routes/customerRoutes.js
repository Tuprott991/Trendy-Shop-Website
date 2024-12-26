// routes/auth.routes.js
const express = require("express");

module.exports = () => {
  const CategoryController = require("../controllers/CategoryController/category.js");
  const ProductController = require("../controllers/ProductController/product.js");
  const OrderController = require("../controllers/OrderController/order.controller.js")
  const router = express.Router();


  router.get("/search/:keyword", ProductController.getSearchProduct);
  
  //router.post("/getId", CategoryController.getId); cái này không xài

  router.get("/category/all", CategoryController.getAllCategory);

  router.get("/search/category/:id", CategoryController.getFilterCategory);
  
  router.get("/product/detail/:id", ProductController.getProductInfo);

  router.post("/order", OrderController.postAddOrder)
  
  return router;  
};
