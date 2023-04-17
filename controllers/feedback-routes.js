const router = require("express").Router()
const { Feedback } = require("../../models/")
const withAuth = require("../../utils/auth")


router.post("/", withAuth, async (req, res) => {
  try {
    const newFeedback = await Feedback.create({
      ...req.body,
      userId: req.session.userId,
    })
    res.json(newFeedback)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router;