import Post from "../models/Post.js";

// Create
export const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read All
export const getPosts = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
};

// Read One
export const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
};

// Update
export const updatePost = async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
};

// Delete
export const deletePost = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json({ message: "Post deleted successfully" });
};
