const express = require('express');
const router = express.Router();
const passport = require("passport");
const passportJWT = require("../config/passport-jwt-strategy");
const homeController = require('../controllers/home_controller');

//routes that are used for home page 
router.get('/profile/:id', passport.checkauthentication,homeController.profile);
router.post('/update/:id', passport.checkauthentication,homeController.update);
router.get('/sign-up', homeController.signUp);
router.get('/sign-in', homeController.signIn);
router.post('/create',homeController.create);
router.get('/', homeController.home);
router.post('/create-session', passport.authenticate('local', { failureRedirect: '/sign-in' }),homeController.createsession);
router.get('/sign-out',homeController.destroysession); 

module.exports = router;