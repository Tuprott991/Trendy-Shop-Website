const { getInfo } = require("../models/userModel.js");


// routes/routes.js
module.exports = (app) => {
 // Import the route functions
 const reRoutes = require("./retailerRoutes.js")();
 const cuHomepage = require("./customerRoutes.js")();
 const userRoutes = require("./userRoutes.js")();

 // Use routes
 app.use("/api/user", userRoutes);
 app.use("/api/auth", userRoutes); // Mount authentication routes
 app.use("/api/retailer", reRoutes); // Mount retailer dashboard routes
 app.use("/api/customer", cuHomepage);
 // Mount the router to `/api` (if necessary)
};


