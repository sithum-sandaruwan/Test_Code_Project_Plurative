const express = require('express');
const { getUsers } = require('../controller/user-controller');
const { authCallBack } = require('../controller/auth/auth-callback-controller');
const { auth, getAuth } = require('../controller/auth/auth-controller');
const { getToken } = require('../controller/auth/token-controller');
const router = express.Router();


// router.get('/api/users', getUsers);
// router.get('/auth', getAuth);
// router.get('/token', getToken);
// router.get('/auth-callback', authCallBack);

router.post('/auth', getAuth);
router.get('/token', getToken);
router.get('/auth-callback', authCallBack);

module.exports = router;

