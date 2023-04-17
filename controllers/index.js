const router = require("express").Router()

const userRoutes = require("./user-routes.js")
const postRoutes = require("./post-routes")
const noteRoutes = require("./notes-routes")

router.use("/user", userRoutes)
router.use("/post", postRoutes)
router.use("/note", noteRoutes)

module.exports = router
