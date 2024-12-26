const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");


const signup = async (req,res)=>{
    try{
        const {name, email, password} = req.body;
        const user = await UserModel.findOne({
            email
        });
        if(user){
            return res.status(409).json({message: 'Email already exists', success: false})
        }
        const userModel = new UserModel({ name, email, password});

        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201).json({message: "signup success", success: true})
        
    }catch(error){
        console.log(error);
        res.status(500).json({message: "internal server error", success: false,error:error})
    }
}

const login = async (req,res)=>{
    try{
        const {email, password} = req.body;
        const user = await UserModel.findOne({
            email
        });
        const errorMsg = `Auth Failed email or password`;
        if(!user){
            return res.status(403).json({message: errorMsg, success: false})
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if(!isPassEqual){
            return res.status(403).json({message: errorMsg, success: false})
        }
        
        const jwtToken = jwt.sign({email: user.email,_id:user._id},process.env.JWT_SECRET);
        // const jwtToken = jwt.sign({email: user.email,_id:user._id},process.env.JWT_SECRET,{expiresIn:"60000"});
        
        res.status(200).json({message: "LOGIN success", success: true,jwtToken,email,name:user.name})
        
    }catch(error){
        console.log(error);
        res.status(500).json({message: "internal server error", success: false,error:error})
    }
}

module.exports = {
    signup,
    login
}