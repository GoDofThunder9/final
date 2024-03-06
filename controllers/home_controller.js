const User = require('../models/user')
const mongoose = require('mongoose');
const express = require('express');
module.exports.home = function(req, res){
    
    return res.render('home', {
        title: "Home"
    });
}
module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}
// render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated())
    {
        return res.redirect("/profile");
    }
   return res.render('user_sign_up',
   {
    title: "sign up"
   });
}
// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated())
    {
        return res.redirect("/");
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}
module.exports.create = async function(req, res) {
    try {
        const user = await User.create(
           {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
           }

        );
        return res.redirect('sign-in');
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).send('Internal Server Error');
    }
};
 
module.exports.createsession = function(req,res)
{
   return  res.redirect ('/sign-in');
}
module.exports.destroysession = function(req, res) {
    console.log("Logging out...");

    req.logout(function(err) {
        if (err) {
            console.error("Error during logout:", err);
            return res.status(500).send('Internal Server Error');
        }


        console.log("Logout successful");
        res.redirect('/');
    });
};

// module.exports.actionName = function(req, res){}