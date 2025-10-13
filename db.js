import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DEFAULT_LOCAL_URI = "mongodb://127.0.0.1:27017/wastezero";

const connectDB = async () => {
  const uri = process.env.MONGO_URI && process.env.MONGO_URI !== "" ? process.env.MONGO_URI : DEFAULT_LOCAL_URI;

  if (!process.env.MONGO_URI) {
    console.warn("⚠️  Warning: MONGO_URI is not set in .env — falling back to local MongoDB:", DEFAULT_LOCAL_URI);
  }

  try {
    await mongoose.connect(uri, {
      // useNewUrlParser/useUnifiedTopology are default in mongoose v6+
    });
    console.log("✅ MongoDB connected successfully to", uri);
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    // Do not exit here so the caller can decide (useful for tests)
    throw error;
  }
};

export default connectDB;
