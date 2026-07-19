// import express package to create the router
import express from "express"
import { login, register } from "../controllers/authController.js";

const authRouter = express.Router();

// adding diff end points
authRouter.post('/register',register)
authRouter.post('/login',login)

export default authRouter

