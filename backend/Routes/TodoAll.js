const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const ensureAuthenticated = require("../Middlewares/Auth");
const todoModel = require("../Models/todo");


router.get("/",ensureAuthenticated,async (req,res)=>{
    try {
        const token = req.headers['authorization'];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded.email,"<---------------");
        // console.log(process.env.JWT_SECRET,"process.env.JWT_SECRET",token);
        // console.log(jwt);
        const items = await todoModel.find({email:decoded.email}).sort({ createdAt: -1 });
        res.json(items);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    
});

module.exports  = router;