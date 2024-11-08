// implement your server here
// require your posts router and connect it here
const express = require('express');
const server = express();
server.use(express.json())

server.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

const postsRoutes = require('./posts/posts-router');

// server.use('/', defaultRoute);
server.use('/api/posts', postsRoutes);

module.exports = server;

