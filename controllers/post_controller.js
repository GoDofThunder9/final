const comment = require("../models/comment");
const mongoose = require("mongoose");
const Post = require("../models/post");
const Like = require("../models/like");
module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      uuser: req.user._id,
    })
    if (req.xhr) {
      await post.populate('uuser').execPopulate();
      return res.status(200).json({
        data: {
          post: post,
        },
        message: " data created",
      });
    }

    req.flash("success", "post published");
    return res.redirect("back");
  } catch (error) {
    req.flash("error", err);
    return;
  }
};
module.exports.destroy = async function (req, res) {
   let post = await Post.findById(req.params.id);

    if (post && post.uuser == req.user.id) {
      // Check if 'post' exists and 'uuser' matches user ID
      Like.deleteMany({ likeble: post, onModel: "Post" });
      Like.deleteMany({ _id: { $in: post.comment } });
      post.remove();
      await comment.deleteMany({ post: req.params.id });
      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: "post deleted successfully",
        });
      }
        req.flash("success", "Post and associative comment got deleted");
        return res.redirect("back");
    } else {
      req.flash("error", "You cannot delete this post");
      return res.redirect("back");
    }
};
module.exports.pages = async function (req, res) {
  let post = await Post.findById(req.params.id);
   return res.render('pages',
    {
      title : "over",
      Post: post,
    }
   );
};