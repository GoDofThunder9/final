const express = require('express');
const router = express.Router();
const passport = require('passport');
const postcontroller = require('../controllers/post_controller');

router.post('/create',passport.checkauthentication,postcontroller.create);
router.get('/destroy/:id',passport.checkauthentication,postcontroller.destroy);
router.get('/page/:id',postcontroller.pages);

module.exports = router;
