// create an anotehr middleware that will be for admin

import { NextFunction, Request, Response } from "express";
import {prisma} from "../config/prisma.js"



const admin= async (req:Request,res:Response,next:NextFunction)=>{
try{
  // this middleware is to detect admin or not
const userId=req.user?.id;
// user id not available
if(!userId){
  return res.status(401).json({message: "Unauthorized"})
}
const user=await prisma.user.findUnique({where: {id: userId}})
// if not found user in database

if(!user){
return res.status(404).json({message: "User not found "})
}
// if user is availabele check admin  email id
const adminEmails=process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(",").map((e)=>e.trim().toLowerCase()): [];
if(adminEmails.includes(user.email.toLowerCase())){
  if(req.user) req.user.isAdmin=true;
  next()
}else{
   res.status(403).json({message: "Admin access required"})
}

}catch(error:any){
  console.log(error);
  return res.status(500).json({message: "Admin verification failed",error:error.message})
}
}

export default admin;

// before executing our controller function.it will check user is admin or not