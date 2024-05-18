const express = require('express');
const router = express.Router();

console.log('router loaded');
// for any further routes, access from here
// router.use('/routerName', require('./routerfile));
router.use('/',require('./home'));
router.use('/posts',require('./posts'));
router.use('/comment',require('./comment'));
router.use('/api',require('./api'));
router.use('/likes',require('./likes'));

module.exports = router;