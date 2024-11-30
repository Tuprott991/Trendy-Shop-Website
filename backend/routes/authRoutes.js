// routes/auth.routes.js
const express = require("express");

module.exports = () => {
  const authController = require("../controllers/UserController/auth.controller.js");
  const router = express.Router();

  // Authentication Routes
  router.post("/signup", authController.signup);
  router.post("/login", authController.login);


  return router;  // Return the router
};
