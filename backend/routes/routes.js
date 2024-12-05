const { getInfo } = require("../models/userModel.js");


// routes/routes.js
module.exports = (app) => {
 // Import the route functions
 const authRoutes = require("./authRoutes.js")(); // Call the function to get the router
 const reDashboardRoutes = require("./retailerRoutes.js")();
 const cuHomepage = require("./customerRoutes.js")();
 const adminRoutes = require("./adminRoutes.js")();
 const userRoutes = require("./userRoutes.js")();

 // Use routes
 app.use("/api/user", userRoutes)
 app.use("/api/auth", authRoutes); // Mount authentication routes
 app.use("/api/admin", adminRoutes);
 app.use("/api/retailer", reDashboardRoutes); // Mount retailer dashboard routes
 app.use("/api/customer", cuHomepage);
 // Mount the router to `/api` (if necessary)
};
