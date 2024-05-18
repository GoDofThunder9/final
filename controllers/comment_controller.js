const { json } = require("stream/consumers");
const comment = require("../models/comment");
const Like = require("../models/like");
const post = require("../models/post");

const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res) {
  try {
    // Find the post by ID
    const foundPost = await Post.findById(req.body.Post);

    if (!foundPost) {
      // Handle case where post is not found
      return res.status(404).send("Post not found");
    }

    // Create a new comment
    const newComment = await Comment.create({
      content: req.body.content,
      post: req.body.Post,
      user: req.user._id
    });
    await newComment.populate('post').populate('user').execPopulate();
    // Add the new comment to the post's comments array
    foundPost.comments.push(newComment);

    // Save the updated post with the new comment
    await foundPost.save();
    if(req.xhr)
      {
        return res.status(200).json({
          data:{
            comments: newComment,
          },
          message: "comment created",
        });
      }
            res.redirect("/");
    // Redirect back to the homepage or desired route
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error creating comment:", error);
    // Respond with an error message or redirect to an error page
    res.status(500).send("Internal Server Error");
  }
};

module.exports.destroy = function (req, res) {
  comment.findById(req.params.id, function (err, Comment) {
    if (Comment.user == req.user.id) {
      let postid = Comment.post;
      Like.deleteMany({ likeable: comment._id, onModel: "Comment" });
      comment.remove();
      post.findByIdAndUpdate(
        postid,
        { $pull: { comments: req.params.id } },
        function (err, post) {
          return res.redirect("back");
        }
      );
    } else {
      return res.redirect("back");
    }
  });
};
