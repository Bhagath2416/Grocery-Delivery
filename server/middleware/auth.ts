import { NextFunction, Request, Response } from "express";
import  jwt  from "jsonwebtoken";


const auth=(req:Request,res:Response,next:NextFunction)=>{
try{
const authHeader=req.headers.authorization;
console.log(authHeader)
// if token not available
if(!authHeader || !authHeader.startsWith('Bearer ')){
       return res.status(401).json({message: "No token provide,authorization denied"});
   }
//    if token is available then verify the token
const token=authHeader.split(" ")[1];
const decoded=jwt.verify(token, process.env.JWT_SECRET as string) as {id: string}
req.user={id:decoded.id}
next()
}catch(error){
  console.log(error);
  return res.status(401).json({message: "Token is not valid"})
}
}

export default auth;