const { User, Post, Comment } = require("../../models");
const router = require("express").Router();
const withAuth = require("../../utils/auth");

// Asynchronously retrieves all posts associated with the current user
async function fetchUserPosts(req, res) {
  console.log(
    "\n",
    "\x1b[33m",
    "Rroute to the dashboard",
    "\x1b[0m",
    "\n"
  );
  try {
    const postInfo = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "post_title", "post_info", "date_entered"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_section",
            "post_id",
            "user_id",
            "date_entered",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    })

    //// Maps the postInfo array to a new array
    const posts = postInfo.map((data) => data.get({ plain: true }))

    res.render("dashboard", {
      posts,
      username: req.session.username,
      logged_in: req.session.loggedIn,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
};

//Renders the view for creating a new post
function renderNewPost(req, res) {
  console.log(
    "\n",
    "\x1b[33m",
   "Activating route for building new posts in dashboardRoutes",
    "\x1b[0m",
    "\n"
  );
  res.render("new-post", {
    username: req.session.username,
    logged_in: req.session.loggedIn,
  })
};

//Gets the post to be edited 
async function editPost(req, res) {
  console.log(
    "\n",
    "\x1b[33m",
    "Activates route for editing a post in dashboardRoutes",
    "\x1b[0m",
    "\n"
  );
  try {
    const postInfo = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "post_title", "post_info", "date_entered"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: [
            "id",
            "comment_section",
            "post_id",
            "user_id",
            "date_entered",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    })

    if (!postInfo) {
      res
        .status(404)
        .json({
          message: "The id provided does not correspond to any existing posts",
        })
      return
    }

    // Converts a Sequelize model instance into a plain JavaScript object
    const post = postInfo.get({ plain: true })

    res.render("Post editing", {
      post,
      edit_id: req.params.id,
      username: req.session.username,
      logged_in: req.session.loggedIn,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
};

router.get("/", withAuth, fetchUserPosts);
router.get("/new", withAuth, renderNewPost);
router.get("/edit/:id", withAuth, editPost);

module.exports = router;
