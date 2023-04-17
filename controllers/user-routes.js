const express = require("express");
const userRouter = express.Router();
const { Account } = require("../../models");
userRouter.post("/", async (req, res) => {
  try {
    const createdUser = await Account.create({
      username: req.body.username,
      password: req.body.password,
    })

    req.session.save(() => {
      req.session.userId = createdUser.id
      req.session.username = createdUser.username
      req.session.loggedIn = true

      res.json(createdUser)
    });
  } catch (err) {
    res.status(500).json(err)
  };
});

userRouter.post("/login", async (req, res) => {
  try {
    const account = await Account.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!account) {
      res.status(400).json({ message: "No user account found!" })
      return
    };

    const correctPassword = account.checkPassword(req.body.password)

    if (!correctPassword) {
      res.status(400).json({ message: "No user account found!" })
      return
    };

    req.session.save(() => {
      req.session.userId = account.id
      req.session.username = account.username
      req.session.loggedIn = true

      res.json({ account, message: "You are now logged in!" })
    });
  } catch (err) {
    res.status(400).json({ message: "No user account found!" })
  };
});

userRouter.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end()
    });
  } else {
    res.status(404).end()
  };
});

module.exports = userRouter;
