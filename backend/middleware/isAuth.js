import { verifySignInToken } from "../src/utils/signInToken.js";
import User from "../src/model/user.model.js";

export const isAuth = async (req,res,next) => {
   const token  = req.cookies.Accesstoken; 
if(!token){
    return res.status(401).json({error:"Unauthorized - No token"});
}

const decoded = verifySignInToken(token);
if(!decoded){
    return res.status(401).json({error:"Invalid token"});
}

const user = await User.findById(decoded.id);
if(!user){
    return res.status(401).json({error:"User not found"});
}
req.user = user;
next();
}