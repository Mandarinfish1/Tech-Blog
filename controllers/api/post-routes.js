const { User, Post, Comment } = require("../../models");
const router = require("express").Router();
const withAuth = require("../../utils/auth");

//function that logs a message indicating that it is activating the route for createing a new post in the postRoutes file.
async function createPost(req, res) {
  console.log(
    "\n",
    "\x1b[33m",
    "Activating route for createing a new post in the postRoutes file.",
    "\x1b[0m",
    "\n"
  );
  console.log(req.body);
  try {
    const postInfo = await Post.create({
      post_title: req.body.post_title,
      post_section: req.body.post_section,
      user_id: req.session.user_id,
    })

    //sending a redirect to the URL /api/dashboard. If an error occurs, a log of error returns a JSON response with a status code of 500.
    res.redirect("/api/dashboard");
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
};

async function updatePost(req, res) {
  console.log(
    "\n",
    "\x1b[33m",
    "Activating the route for updating a post in the postRoutes file.",
    "\x1b[0m",
    "\n"
  );
  try {
    const postInfo = await Post.update(
      {
        post_title: req.body.post_title,
        post_section: req.body.post_section,
      },
      {
        where: {
          id: req.body.postId,
        },
      }
    )
    if (!postInfo) {
      res
        .status(404)
        .json({ message: "This ID does not match any post in the database." })
      return
    };
    res.redirect("/api/dashboard")
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
};

async function removePost(req, res) {
  console.log(
    "\n",
    "\x1b[33m",
    "Activateing route rfor removing a post in the postRoutes file.",
    "\x1b[0m",
    "\n"
  );
  try {
    const postInfo = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!postInfo) {
      res.status(404).json({ message: "No post found with this id" })
      return
    }
    res.status(200).json(postInfo)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
};

router.post("/new", withAuth, createPost);
router.post("/update", withAuth, updatePost);
router.delete("/:id", withAuth, removePost);

module.exports = router;
