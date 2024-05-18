const User = require("../models/user");
const post = require("../models/post");
const mongoose = require("mongoose");
const express = require("express");
const fs = require("fs");
const path = require("path");

module.exports.home = async function(req, res){

  try{
       // populate the user of each post
      let posts = await post.find({})
      .sort('-createdAt')
      .populate('uuser')
      .populate({
          path: 'comments',
          populate: {
              path: 'user'
          }
      });
  
      let users = await User.find({});

      return res.render('home', {
          title: "Codeial | Home",  
          posts:  posts,
          all_users: users
      });

  }catch(err){
      console.log('Error', err);
      return;
  }
 
}

module.exports.profile = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    let Posts = await post.find({})
      .sort('-createdAt')
      .populate('uuser')
      .populate({
          path: 'comments',
          populate: {
              path: 'user'
          }
      });
    return res.render('user_profile', {
      title: 'User Profile',
      profile_user: user,
      Post: Posts
    });
  } catch (err) {
    console.error('Error in finding the user or post:', err);
    return res.status(500).send('Internal Server Error');
  }
};

module.exports.update = async function (req, res) {
  // if(req.user.id == req.params.id)
  // {
  //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user)
  //     {
  //         return res.redirect('back');
  //     }
  //     );
  // }
  // else
  // {
  //     return res.status(401).send('Unauthorized');
  // }

  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("****multererror:", err);
        }
        user.name = req.body.name;
        user.email = req.body.email;
        if (req.file) {
          if (user.avatar) {
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        return res.redirect('/')
      });
    } catch {
      console.error("Error creating user:", error);
      return res.status(500).send("Internal Server Error");
    }
  } else {
    req.flash("error", "Unauthorized");
    return res.status(401).send("Unauthorized");
  }
};
// render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/profile");
  }
  return res.render("user_sign_up", {
    title: "sign up",
  });
};
// render the sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};
module.exports.create = async function (req, res) {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    });
    return res.redirect("sign-in");
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports.createsession = function (req, res) {
  req.flash("success", "logged in successfully");
  return res.redirect("/");
};
module.exports.destroysession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.error("Error during logout:", err);
      return res.status(500).send("Internal Server Error");
    }
    req.flash("success", "logged out successfully");
    res.redirect("/");
  });
};
