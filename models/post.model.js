const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        required: true
    },
    like: {
        type: Number,
        default: 0
    },
    likedUsers: [
        {
            type: String
        }
    ],
    comments: [
        {
            author: String,
            text: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, { timestamps: true })


const postModel = new mongoose.model("post", postSchema);
module.exports = postModel;