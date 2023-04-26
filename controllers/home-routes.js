// set up Express router
const router = require('express').Router();

// load the required models
const models = require("../models");

const Post = models.Post;
const User = models.User;
const Comment = models.Comment;

async function fetchAllPosts() {
  return await Post.findAll({
    attributes: ["id", "post_title", "post_info", "date_entered"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_section", "post_id", "user_id", "date_entered"],
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
  });
};

async function fetchPostById(id) {
  return await Post.findOne({
    where: { id },
    attributes: ["id", "post_info", "post_title", "date_entered"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_section", "post_id", "user_id", "date_entered"],
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
  });
};

router.get("/", async (req, res) => {
  console.log("Logs a message to the console when the homepage is accessed");

  try {
    const allPostsData = await fetchAllPosts()
    const posts = allPostsData.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      posts,
      username: req.session.username,
      logged_in: req.session.loggedIn,
    })
  } catch (error) {
    res.status(500).json(error);
  };
});

router.get("/post/:id", async (req, res) => {
  console.log("Logs a message to the console when the comments route is accessed");

  try {
    const singlePostData = await fetchPostById(req.params.id)

    if (!singlePostData) {
      res.status(404).json({ message: "No post found with this id" });
      return
    }

    const post = singlePostData.get({ plain: true });
    res.render("post-with-comments", {
      post,
      logged_in: req.session.loggedIn,
      username: req.session.username,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  };
});

router.get("/login", (req, res) => {
  console.log("Login route accessed")

  if (req.session.loggedIn) {
    res.redirect("/")
    return
  };

  res.render("login")
});

