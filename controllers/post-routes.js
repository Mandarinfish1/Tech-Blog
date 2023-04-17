const express = require("express");
const postsRouter = express.Router();
const { Post } = require("../../models/");
const authenticate = require("../../utils/auth");

postsRouter.post("/", authenticate, async (req, res) => {
  const requestBody = req.body

  try {
    const newEntry = await Post.create({
      ...requestBody,
      userId: req.session.userId,
    })
    res.json(newEntry)
  } catch (error) {
    res.status(500).json(error)
  }
})

postsRouter.put("/:id", authenticate, async (req, res) => {
  try {
    const [updatedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    })

    if (updatedRows > 0) {
      res.status(200).end()
    } else {
      res.status(404).end()
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

postsRouter.delete("/:id", authenticate, async (req, res) => {
  try {
    const [removedRows] = Post.destroy({
      where: {
        id: req.params.id,
      },
    })

    if (removedRows > 0) {
      res.status(200).end()
    } else {
      res.status(404).end()
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = postsRouter
