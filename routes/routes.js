const express = require('express');
const router = express.Router();
const db = require("../models");

//get all posts
router.get('/posts', async (req, res) => {
    const posts = await db.Post.findAll();
    res.status(200).json(posts)
})
//get by post id
router.get('/posts/:id', async (req, res) => {
    const id = req.params.id;
    const post = await db.Post.findOne({ where: { id } })
    if (post) {
        res.status(200).json(post)
    }
    else res.status(400).send("id not found")
})
//post a blog post to api
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
// edit post data
router.patch('/posts/:id', async (req, res) => {
    var id = req.params.id;
    var { title, content, image, category } = req.body;
    db.Post.findOne({ where: { id } }).then(data => {
        data.update({
            title,
            content,
            image,
            category
        }).then(r => {
            res.status(200).json(r);
        }).catch(err => {
            res.status(400).send('an error ocurred')
        })
    }).catch(err => {
        res.status(400).send('post not find')
    });

})
// delete post
router.delete('/posts/:id', (req, res) => {
    var id = req.params.id;
    db.Post.findOne({ where: { id } }).then(data => {
        data.destroy().then(r => {
            res.status(200).json(r)
        }).catch(err => { res.status(400).send(err.message) })
    }).catch(err => {
        res.status(400).send(err.message)
    })
})

module.exports = router;