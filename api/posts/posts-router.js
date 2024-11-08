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
router.get('/:id', async (req, res) => {
    const id = req.params.id

    try{
        const possiblePost= await Post.findById(id)
        if(!possiblePost){
            return res.status(404).json({message:"does not exist"});
        }
        res.status(200).json(possiblePost); // Post exists, send it in the response
    } catch(err){
        res.status(500).json({
            message: "error getting posts",
            err: err.message,
            stack: err.stack,
        });
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
    const id = req.params.id
    const {title,contents}=req.body

    if(!title || !contents){
        res.status(400).json({message:"provide title and contents"})
    }else{
        try{
            const adjId= await Post.update(id, req.body)
            const adjPost = await Post.findById(adjId); 
            if(!adjPost){
                return res.status(404).json({message:"does not exist"});
            }
            res.status(201).json(adjPost);
        }catch(err){
            res.status(500).json({
                message: "error getting posts",
                err: err.message,
                stack: err.stack,
            });
        }
    }
});

// GET: Returns an array of comment of a user defined by ID
router.get('/:id/comments', async (req, res) => {
    const id = req.params.id
    try{
        const possiblePost= await Post.findById(id)
        const comments = await Post.findPostComments(id)
        if(!possiblePost || !comments){
            return res.status(404).json({message:"does not exist"});
        }

        res.status(200).json(comments); // Post exists, send it in the response
    } catch(err){
        res.status(500).json({
            message: "error getting posts",
            err: err.message,
            stack: err.stack,
        });
    }
});

router.delete('/:id', async (req, res) => {
    const id=req.params.id
    try{
        const possiblePost= await Post.findById(id)
        const deletedPost= await Post.remove(id)

        if(!deletedPost || !possiblePost){
            return res.status(404).json({message:"does not exist"});
        }

        res.status(200).json(possiblePost); // Post exists, send it in the response
    } catch(err){
        res.status(500).json({
            message: "error getting posts",
            err: err.message,
            stack: err.stack,
        });
    }
})






router.post('/', (req, res) => {
    res.status(200).send('hello from the POST /posts endpoint');
});

module.exports = router;