const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentcontroller = require('../controllers/comment_controller');

router.post('/create',passport.checkauthentication,commentcontroller.create);
router.get('/destroy/:id',passport.checkauthentication,commentcontroller.destroy);
module.exports = router;