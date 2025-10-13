import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/", createPost);      // Create
router.get("/", getPosts);         // Read all
router.get("/:id", getPostById);   // Read one
router.put("/:id", updatePost);    // Update
router.delete("/:id", deletePost); // Delete

export default router;
