const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req,res,next)=>{
    const auth = req.headers["authorization"];
    if(!auth){
        return res.status(403).json({message:"Unauthorised, JWT token required"})
    }
    try{
        const decoded = jwt.verify(auth,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).json({
            message:"Invalid JWT token",error:error
        })
    }

}

module.exports= ensureAuthenticated;