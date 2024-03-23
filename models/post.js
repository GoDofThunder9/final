const mongoose = require("mongoose");
const User = require("./user");
const user = require("./user");
const postSchema = new mongoose.Schema(
    {
        content:
        {
             type: String,
             require: true,
        },
        uuser:  
        {
            type : mongoose.Schema.Types.ObjectId,
            ref: User,
        }
    },
    {
        timestamps : true,
    }
);
const Post = mongoose.model('Post',postSchema);
module.exports = Post;