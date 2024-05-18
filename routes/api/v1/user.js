const express = require('express');
const router = express.Router();
const UserApi = require('../../../controllers/api/v1/users_api');

router.post('/create-session',UserApi.createsession);
module.exports = router;