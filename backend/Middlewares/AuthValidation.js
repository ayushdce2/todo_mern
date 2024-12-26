const Joi = require("joi");

const signupvalidation = (req,res,next)=>{
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    })

    const {error} = schema.validate(req.body);

    if(error){
        return res.status(400).json({message: "Bad request", error})
    }

    next();
}

const loginvalidation = (req,res,next)=>{
    const schema = Joi.object({
        
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    })

    const {error} = schema.validate(req.body);

    if(error){
        return res.status(400).json({message: "Bad request", error})
    }

    next();
}

const todoAddValidation = (req,res,next)=>{
    // console.log("todoAddValidation middlewares",req.body);
    const schema = Joi.object({
        
        // description: Joi.string().email().required(),
        description: Joi.string().min(4).max(300).required()
    })

    const {error} = schema.validate(req.body);

    if(error){
        return res.status(400).json({message: "Bad request validation", error})
    }


    next();
}

module.exports = {
    signupvalidation,
    loginvalidation,
    todoAddValidation
    
}