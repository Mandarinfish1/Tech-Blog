const { User } = require("../../models");
const router = require("express").Router();

async function createUser(req, res) {
  console.log(
    "\n",
    "\x1b[33m",
    "activating route for createing a new user in the userRoutes file.",
    "\x1b[0m",
    "\n"
  )
  //creating the User model with the info from the request body (req.body) for the fields username, email, and password. The result is stored in the dbUserInfo variable.
  try {
    const dbUserInfo = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })

    req.session.save(() => {
      req.session.user_id = dbUserInfo.id
      req.session.username = dbUserInfo.username
      req.session.loggedIn = true
      res.status(200).json(dbUserInfo)
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
};

async function loginUser(req, res) {
  console.log(
    "\n",
    "\x1b[33m",
    "activateing the route for logging in a registered user in the userRoutes file.",
    "\x1b[0m",
    "\n"
  );
  try {
    const dbUserInfo = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserInfo) {
      res
        .status(400)
        .json({ message: "The email or password you entered is incorrect. Please try again." })
      return
    };

    const authPassword = await dbUserInfo.verifyPassword(req.body.password);

    if (!authPassword) {
      res
        .status(400)
        .json({ message: "The email or password you entered is incorrect. Please try again." })
      return
    };

    req.session.save(() => {
      req.session.user_id = dbUserInfo.id
      req.session.username = dbUserInfo.username
      req.session.loggedIn = true
      res
        .status(200)
        .json({ user: dbUserInfo, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
};

function logoutUser(req, res) {
  console.log(
    "\n",
    "\x1b[33m",
    "Started the process of logging out a User in userRoutes",
    "\x1b[0m",
    "\n"
  )
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end()
    })
  } else {
    res.status(404).end()
  }
};

router.post("/", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
