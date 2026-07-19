import { Request,Response } from "express";
import { prisma } from "../config/prisma.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


// Generate JWT token
// here created a function using that we can generate and return a token
const generateToken=(id: string)=>{
    return jwt.sign({id}, process.env.JWT_SECRET as string, {expiresIn: "30d"})
}


// check if user is admin
const getAdminStatus=(email: string | null | undefined) :boolean => {

      if(!email) return false;
    //   split converts string into an array,map runs inside inside every element,e ->it removes each items for spaces and convert to lower space
      const adminEmails=process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(",").map((e)=>e.trim().toLowerCase()):[];
      return adminEmails.includes(email.toLowerCase())
}


//Register*
// type/path
//Post /api/auth/register*
// create function and export it



export const register = async(req:Request, res:Response) =>{
const {name,email,password}=req.body;
console.log(req.body)
if(!name || !email || !password){
    return res.status(400).json({message: "Please provide all fields"})
}

const existingUser = await prisma.user.findUnique({where: {email: email.toLowerCase()}})
// if user is rigister with existin email id
if(existingUser){
    return res.status(400).json({message: "User already exists with this email"})
}
// here encrypt the user password that we are receiving from req.body.if user was not exist with that email id
const hashedPassword= await bcrypt.hash(password, 10)
const user =await prisma.user.create({
    data: {name,email: email.toLowerCase(),password: hashedPassword}
})

// by using this token generate an unqiue token
const token=generateToken(user.id)


const userData: any = {...user};
delete userData.password

//is Admin is new property added to userData object
userData.isAdmin = getAdminStatus(userData.email)

res.status(201).json({user: userData, token})
}



// Login 
//Post /api/auth/Login

export const login = async(req:Request, res:Response) =>{
    const {email,password}=req.body;
    console.log(req.body)
    if(!email || !password){
        return res.status(400).json({message: "Please provide email and password"})
    }
    
    const user = await prisma.user.findUnique({where: {email: email.toLowerCase()}, include: {addresses: true}})
    // if user is rigister with existin email id
    if(!user){
        return res.status(401).json({message: "Invalid email or password"})
    }

    
//    if user is availabele
const isMatch = await bcrypt.compare(password, user.password)
// if password is not matching
if(!isMatch){
    return res.status(401).json({message: "Invalid email or password"})
}
  
   
    
    // by using this token generate an unqiue token
    // if password is matching generate a token
    const token=generateToken(user.id)
    
    // after token generation generate user data
    const userData: any = {...user};
    delete userData.password
    
    userData.isAdmin = getAdminStatus(userData.email)
    
    res.status(201).json({user: userData, token})
    }
    