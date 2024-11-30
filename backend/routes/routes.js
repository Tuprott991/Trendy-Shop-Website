// routes/routes.js
module.exports = (app) => {
    // Import the route functions
    const authRoutes = require("./authRoutes.js")();  // Call the function to get the router
    const reDashboardRoutes = require("./retailerRoutes.js")();
    const cuHomepage = require("./customerRoutes.js")();
  
    // Use routes
    app.use("/auth/api", authRoutes);  // Mount authentication routes
    app.use("/retailer/api", reDashboardRoutes);  // Mount retailer dashboard routes
    app.use("/customer/api", cuHomepage);
    // Mount the router to `/api` (if necessary)
  };
  