import express from "express"
import { commentpost, createPost, deletecomment, deletePost, getPostById, getPosts, likePost } from "../controllers/postController.js"
import upload from "../middlewares/multer.js"
import {protect} from "../middlewares/protect.js"

const postRouter = express.Router()

postRouter.post("/createpost",upload.single("image"),protect, createPost)
postRouter.get("/getposts", getPosts)
postRouter.get("/getpost/:id", getPostById)
postRouter.put("/:id/like",protect, likePost)
postRouter.post("/:id/comment",protect,commentpost)
postRouter.delete("/:postId/comment/:commentId",protect,deletecomment)
postRouter.delete("/delete/:id", deletePost)

export default postRouter