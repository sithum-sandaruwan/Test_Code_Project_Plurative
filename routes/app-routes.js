const express = require('express');
const router = express.Router();
const authControl = require("../controller/auth-controller");
const userControl = require("../controller/user-controller");
const tokenControl = require("../controller/token-controller");
const authCallBackControl = require("../controller/auth-callback-controller");

router.get('/api/users',userControl.getUsers);
router.get('/auth',authControl.auth);
router.get('/token',tokenControl.JWT);
router.get('/auth-callback',authCallBackControl.authCallBack);

module.exports = router;

