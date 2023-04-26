//importing the required modules and setting up routes:
const express = require("express");
const router = express.Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");

function setupRoutes() {
  router.use("/", homeRoutes);
  router.use("/api", apiRoutes);
}

setupRoutes();

module.exports = router;
