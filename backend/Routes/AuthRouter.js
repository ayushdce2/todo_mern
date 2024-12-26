const express = require('express');
const router = express.Router();

const {signupvalidation, loginvalidation, todoAddValidation} = require("../Middlewares/AuthValidation");

const {signup,login,todoAdd} = require("../Controllers/AuthController");
// const {getTodos, addTodo, deleteTodo, updateTodo} = require("../Controllers/Todo");

router.post("/login",loginvalidation, login);
router.post("/signup",signupvalidation, signup);
router.post("/todoADD",todoAddValidation, todoAdd);


module.exports  = router;