const router = require("express").Router();
const PostController = require("../controllers/post.controller");




router
    .route("/posts")
    .post(PostController.addPost);

router
    .route("/posts")
    .get(PostController.getAllPost);

router
    .route("/posts/:id")
    .get(PostController.getSinglePost);

router
    .route("/posts/comments")
    .post(PostController.addComment);



module.exports = router