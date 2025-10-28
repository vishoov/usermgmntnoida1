const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY

const createToken = (user)=>{
   try{
        const token = jwt.sign(
            {
                email:user.email,
                id:user._id
            },
            secretKey,
            {
                algorithm:"HS256",

                expiresIn:"30d",
                issuer:"user_management_api"
            }
        )

        return token;
   }
   catch(err){
    throw new Error(err.message);
   }
}


//verify Token 
const verifyToken= (req, res, next)=>{
    try{    
        //1. extract the token from header
        const tokenString = req.headers.authorization;

        // Bearer ;ofb;ojdg[ry/dohdohohelnf'oih]
        if(!tokenString){
            res.json({
                message:"Token not found"
            })
        }

        const token = tokenString.split(" ")[1];

        const decoded = jwt.verify(token, secretKey);

        if(!decoded){
            res.json({
                message:"The token you provided is incorrect"

            })
        }

        req.user= decoded; 
        next();
    }catch(err){
        res.status(500).json({
            message:"User authentication failed"
        })
    }
}


module.exports = {
    createToken,
    verifyToken
}