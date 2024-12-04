const express = require("express");


module.exports =  () =>{ 
    const user = require("../controllers/UserController/user.controller");
    const router = express.Router();

    // Retailer Dashboard Routes
    router.get("/getprofile", user.getProfile);

    return router;
};