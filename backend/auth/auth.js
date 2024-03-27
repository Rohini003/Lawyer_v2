import jwt from "jsonwebtoken";
import Lawyer from "../models/LawyerSchema.js";
import User from "../models/UserSchema.js";

export const authenticate = async (req,res,next) =>{

    const authToken = req.headers.autherization
    if(!authToken || !authToken.startsWith('Bearer')){
        return res.status(401).json({success:false,message:'No token, autherization denied'})
    }

    try {
        console.log(authToken);
        next();
    } catch(err){

    }
}