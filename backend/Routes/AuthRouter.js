const express = require('express');
const router = express.Router();

const {signupvalidation, loginvalidation} = require("../Middlewares/AuthValidation");

const {signup,login} = require("../Controllers/AuthController");

router.post("/login",loginvalidation, login);
router.post("/signup",signupvalidation, signup);


module.exports  = router;