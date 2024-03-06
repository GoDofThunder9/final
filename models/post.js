const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
    {
        content:
        {
             type: String,
             require: true,
        },
        User:  
        {
            type : mongoose.Schema.Types.ObjectId,
            require:true,
        }
    },
    {
        timestamps : true,
    }
);
const Post = mongoose.model('Post',postSchema);
module.exports = post;