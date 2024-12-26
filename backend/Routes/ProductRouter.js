const express = require('express');
const router = express.Router();
const ensureAuthenticated = require("../Middlewares/Auth");

router.get("/",ensureAuthenticated,(req,res)=>{
    console.log(req.user);
    res.status(200).json([
        {
            name:"mobile",
            price:10000
        },
        {
            name:"tv",
            price:10000
        },
        {
            name:"mobile",
            price:10000
        }

    ]);
});

module.exports  = router;