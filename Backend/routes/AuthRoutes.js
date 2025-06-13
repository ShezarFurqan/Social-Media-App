import express from "express"
import {Register, Login} from "../controllers/authController.js"

const authRouter = express.Router()

authRouter.post("/register", Register)
authRouter.post("/login", Login)

export default authRouter