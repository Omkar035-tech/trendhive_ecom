import express from "express";
import { loginUser, adminLogin, registerUser } from "../controllers/userController.js";


const userRouter = express.Router();

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/adminpanel", adminLogin)

export default userRouter;