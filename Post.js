import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
    ngo_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to NGO/User
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
