// routes/auth.routes.js
const express = require("express");

module.exports = () => {
  const authController = require("../controllers/UserController/user.controller.js");

  const router = express.Router();

  // Authentication Routes\
  router.post("/signup", authController.postSignup);
  router.post("/login", authController.postLogin);

  return router;  // Return the router
};
