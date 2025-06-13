import express from "express";
import { getMessages, getUserChats, markMessageAsSeen, sendMessages } from "../controllers/chatController.js";
import { protect } from "../middlewares/protect.js"

const chatRouter = express.Router()

chatRouter.get("/users", protect, getUserChats)
chatRouter.get("/:id", protect, getMessages)
chatRouter.put("/mark/:id", protect, markMessageAsSeen)
chatRouter.post("/send/:id", protect, sendMessages)

export default chatRouter