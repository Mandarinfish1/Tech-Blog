//importing the Comment model and sets up an Express router with authentication middleware.
const { Comment } = require("../../models");
const router = require("express").Router();
const withAuth = require("../../utils/auth");

//route for posting a new comment is being handled in the commentRoutes file.
async function postComment(req, res) {
  console.log(
    "\n",
    "\x1b[33m",
    "The route for posting a new comment is rendered in the commentRoutes file.",
    "\x1b[0m",
    "\n"
  )
  try {
    if (req.session) {
      const commentInfo = await Comment.create({
        comment_section: req.body.comment_section,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
      })
      res.status(201).json(commentInfo);

    }
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
};

//post route for creating a new comment
router.post("/", withAuth, postComment);

module.exports = router;
