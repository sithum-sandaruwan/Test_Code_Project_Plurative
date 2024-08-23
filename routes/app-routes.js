const express = require('express');
const router = express.Router();
const authControl = require("../controller/auth-controller");
const userControl = require("../controller/user-controller");
const tokenControl = require("../controller/token-controller");
const authCallBackControl = require("../controller/auth-callback-controller");

