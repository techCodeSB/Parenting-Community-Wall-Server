const postModel = require("../models/post.model");
const ApiError = require("../utils/ApiError");


class PostController {
    static addPost = async (req, res) => {
        const { author, msg } = req.body;

        if ([author, msg].some((field) => !field || field === "")) {
            throw new ApiError(500, "fill the required");
        }


        const newPost = await postModel.create({
            author,
            msg
        })

        if (!newPost) {
            throw new ApiError(500, "Post not create");
        }

        return res.status(200).json({ data: newPost });

    }


    static getAllPost = async (req, res) => {
        let { page = 1, limit = 10 } = req.body;
        page = Number(page);
        limit = Number(limit);
        const skip = (page - 1) * limit;


        const [data, totalData] = await Promise.all([
            await postModel.find().skip(skip).limit(limit),
            await userModel.countDocuents()
        ]);

        if (!data || data.length === 0) {
            throw new ApiError(404, "No Post");
        }

        return res.status(200).json({
            data: data,
            total: totalData,
            page,
            limit
        });

    }

    // Get Single Post with all Comments and Likes
    static getSinglePost = async (req, res) => {
        const { id } = req.params;

        if (!id) {
            throw new ApiError(404, "User id not provided");
        }

        const post = await postModel.findOne({ _id: id });
        if (!post) {
            throw new ApiError(404, "No Post");
        }

        return res.status(200).json({ data: post })
    }



    static toggleLike = async (req, res) => {
        const { postId, userId } = req.body;


        if ([postId, userId].some((field) => !field || field === "")) {
            throw new ApiError(400, "postId and userId are required");
        }

        // check post exist
        const post = await postModel.findById(postId);

        if (!post) {
            throw new ApiError(400, "Post not found");
        }

        let isLiked = false;

        if (post.likedUsers.includes(userId)) {
            // Unlike post
            await postModel.updateOne(
                { _id: postId },
                {
                    $pull: { likedUsers: userId },
                    $inc: { like: -1 }
                }
            );
        } else {
            // Like Post
            await postModel.updateOne(
                { _id: postId },
                {
                    $addToSet: { likedUsers: userId },
                    $inc: { like: 1 }
                }
            );
            isLiked = true;
        }

        return res.status(200).json({
            message: isLiked ? "Liked" : "Unliked",
            liked: isLiked
        });


    };


    static addComment = async (req, res) => {
        const { postId, text, author } = req.body;

        if ([postId, text, author].some(f => !f || f === "")) {
            throw new ApiError(500, "fill the required fields");
        }

        const newComment = await postModel.updateOne({ _id: postId }, {
            $push: {
                comments: {
                    author,
                    text
                }
            }
        })

        if (result.matchedCount === 0) {
            throw new ApiError(400, "Post not found");
        }

        return res.status(200).json({
            msg: "Comment added successfully",
            data: newComment
        });

    }

}


module.exports = PostController;