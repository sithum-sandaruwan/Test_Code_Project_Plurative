const express = require('express');
const { getUsers } = require('../controller/user-controller');
const { authCallBack } = require('../controller/auth/auth-callback-controller');
const { auth, getAuth } = require('../controller/auth/auth-controller');
const { getToken } = require('../controller/auth/token-controller');
const router = express.Router();
// const authControl = require("../controller/auth-controller.js");
// const userControl = require("../controller/user-controller.js");
// const tokenControl = require("../controller/token-controller.js");
// const authCallBackControl = require("../controller/auth-callback-controller.js");

router.get('/api/users', getUsers);
router.get('/auth', getAuth);
router.get('/token', getToken);
router.get('/auth-callback', authCallBack);

module.exports = router;

