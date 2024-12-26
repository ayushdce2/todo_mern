const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");
const todoModel = require("../Models/todo");


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
        // console.log(process.env.JWT_SECRET,"<------process.env.JWT_SECRET-----------token->",jwtToken);
        res.status(200).json({message: "LOGIN success", success: true,jwtToken,email,name:user.name})
        
    }catch(error){
        console.log(error);
        res.status(500).json({message: "internal server error", success: false,error:error})
    }
}

const todoAdd = async (req,res)=>{
    // console.log("todoAdd controller123",req.body);
    const token = req.headers['authorization'];
    
        // console.log(token,"<-- - token <br/>",process.env.JWT_SECRET);   
    // res.send("todoADD REACHED");
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decoded.email,"decoded");
            // console.log(jwt);
        // const userFound = await UserModel.findOne(decoded.id).select('-password')
// console.log(userFound,"<-- UsER FOUND");
        const {description} = req.body;
        const todoADDdescription = await todoModel.create({
            description: description,
            email:decoded.email,
            // createdAt:{type:Date, default: Date.now }
            
        });
        const dataInserted = await todoADDdescription.save();
        // console.log('DATA inserted:', dataInserted);
        res.status(201).json({message: "data insert success", success: true});
      } catch (err) {
        // console.error('Error adding data:', err.message);
        res.status(500).json({message: "Data not inserted", success: false})
      }
    
}

module.exports = {
    signup,
    login,
    todoAdd
}