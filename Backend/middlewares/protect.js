import jwt from "jsonwebtoken"
import userModel from "../models/usermodel.js"

export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Unauthorized: No token" })
        }

        const token = authHeader.split(" ")[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.id).select("-password")
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized: User not found" })
        }

        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" })
    }
}
