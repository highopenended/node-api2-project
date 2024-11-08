// implement your posts router here
const express = require('express');
const router = express.Router();
const Post = require("./posts-model");


// GET: Returns list of all posts
router.get('/', (req, res) => {
    Post.find()
        .then(users=>{
            console.log(users)
            res.status(200).json(users)
        })
        .catch((err) => {
          res.status(500).json({
            message: "The posts information could not be retrieved",
            err: err.message,
            stack: err.stack,
          });
        });
});

// GET: Returns a user by ID
router.get('/:id', (req, res) => {
    const id = req.params.id
    if(id){
        Post.findById(id)
        .then((user)=>{
            res.status(200).json(user)
        })
        .catch((err) => {
            res.status(500).json({
              message: "The post information could not be retrieved",
              err: err.message,
              stack: err.stack,
            });
          });
    } else{        
        res.status(404).json("The post with the specified ID does not exist")
    }
});


// POST: Add new post
router.post('/', async (req, res) => {
    const {title, contents} = req.body
    if(!title || !contents){
        res.status(400).json({message:"Please provide title and contents for the posts"})
    } else{
        try{
            const newId= await Post.insert(req.body)
            const newPost = await Post.findById(newId.id); 
            res.status(201).json(newPost);
        }catch(err){
            res.status(500).json({
                message: "error getting posts",
                err: err.message,
                stack: err.stack,
            });
        }
    } 
});

// PUT: Make a change to an existing post
router.put('/:id', async (req, res) => {
    const {id} = req.params.id
    if(id){
        Post.findById(id)
        .then((user)=>{
            res.status(200).json(user)
        })
        .catch((err) => {
            res.status(500).json({
              message: "The post information could not be retrieved",
              err: err.message,
              stack: err.stack,
            });
          });
    } else{        
        res.status(404).json("The post with the specified ID does not exist")
    }
});




// GET: Returns an array of comment of a user defined by ID
router.get('/:id/comments', (req, res) => {
    const id = req.params.id
    if(id){
        Post.findById(id)
        .then((user)=>{
            res.status(200).json(user)
        })
        .catch((err) => {
            res.status(500).json({
              message: "error getting posts",
              err: err.message,
              stack: err.stack,
            });
          });
    } else{        
        res.status(404).json("No ID")
    }
});


router.post('/', (req, res) => {
    res.status(200).send('hello from the POST /posts endpoint');
});

module.exports = router;