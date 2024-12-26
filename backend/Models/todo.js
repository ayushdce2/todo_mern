const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    description : {
        type : String,
        required : true,
    },
    email:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

const todoModel = mongoose.model("todo",TodoSchema); 
module.exports = todoModel;