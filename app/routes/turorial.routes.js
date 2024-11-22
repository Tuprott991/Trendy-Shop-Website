module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");
  const authController = require("../controllers/auth.controller.js");

  const router = require("express").Router();

  // Tutorials Routes
  router.post("/tutorials", tutorials.create);
  router.get("/tutorials", tutorials.findAll);
  router.get("/tutorials/published", tutorials.findAllPublished);
  router.get("/tutorials/:id", tutorials.findOne);
  router.put("/tutorials/:id", tutorials.update);
  router.delete("/tutorials/:id", tutorials.delete);
  router.delete("/tutorials", tutorials.deleteAll);

  // Authentication Routes
  router.post("/auth/signup", authController.signup);
  router.post("/auth/login", authController.login);

  // Mount the router to `/api`
  app.use("/api", router);
};
