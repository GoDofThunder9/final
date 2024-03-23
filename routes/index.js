const express = require('express');
const router = express.Router();
const passport = require("passport");
const homeController = require('../controllers/home_controller');
console.log('router loaded');
router.use('/posts',require('./posts'));
router.get('/profile', passport.checkauthentication,homeController.profile);
router.get('/sign-up', homeController.signUp);
router.get('/sign-in', homeController.signIn);
router.post('/create',homeController.create);
router.get('/', homeController.home);
router.post('/create-session', passport.authenticate('local', { failureRedirect: '/sign-in' }),
homeController.createsession);
router.get('/sign-out',homeController.destroysession); 
// for any further routes, access from here
// router.use('/routerName', require('./routerfile));
module.exports = router;