const express = require('express');
const router = express.Router();
const db = require("../models");

router.get('/posts', async (req, res) => {
    const posts = await db.Post.findAll();
    res.status(200).json(posts)
})

router.get('/posts/:id', async (req, res) => {
    const id = req.params.id;
    const post = await db.Post.findOne({ where: { id } })
    if (post) {
        res.status(200).json(post)
    }
    else res.status(400).send("id not found")
})

router.post('/posts', async (req, res) => {
    var { title, content, image, category } = req.body;
    try {
        if (title && content && image && category) {
            var post = await db.Post.create({
                title,
                content,
                image,
                category
            })
            res.status(200).json(post);
        }
        else {
            res.status(400).json(err = "there are missing parameters")
        }
    }
    catch {
        err =>
        res.status(400).json(err.message)
    }
})

module.exports = router;