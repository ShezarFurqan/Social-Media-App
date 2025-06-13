import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    content: { text: { type: String, default: "" }, image: { type: String, required: true }, },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    comments: [{
        text: String,
        username: String,
        profilepic: String,
        createdAt: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }
});

const PostModel = mongoose.models.post || mongoose.model("post", postSchema);

export default PostModel;
