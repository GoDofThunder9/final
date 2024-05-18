
const User = require("./user");
const comment = require("./comment");
const mongoose = require("mongoose");
const Like = require("./like");
const { type } = require("os");
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
            ref: 'User',
        },
        comments: 
        [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'comment',
        }
        ]
        ,
        likes :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Like'
        }]
    },
    {
        timestamps : true,
    }
);
const Post = mongoose.model('Post',postSchema);
module.exports = Post;