const express = require("express");
const app = express();
const mongoose = require("mongoose");

const My_Mongo_Url = "mongodb+srv://ayushdce2:8445315561Aa@cluster0.8kkxg.mongodb.net/todo_mern?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(My_Mongo_Url)
.then((response)=>{console.log("Connected to empMgmtD"); db_status="connected DB"})
.catch((error)=>{console.log(error,"error NOT connected to empMgmtD"); db_status="NoT connected DB"});

app.get("/",(req,res)=>{
    res.send("backend Connected  . . . . .  .");
})

app.listen(8080,()=>{
    console.log("Server is running on port 8080");
});