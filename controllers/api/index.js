//setting up Express router
const express = require("express");
const router = express.Router();

//setting routes
const userRoutes = require("./userRoutes");;
const dashboardRoutes = require("./dashboardRoutes");
const postRoutes = require("./postsRoutes");
const commentRoutes = require("./commentRoutes");

function registerRoutes() {
  router.use("/users", userRoutes);
  router.use("/dashboard", dashboardRoutes);
  router.use("/posts", postRoutes);
  router.use("/comments", commentRoutes);
}

registerRoutes();

//Exporting router object to use throughout files.
module.exports = router;
