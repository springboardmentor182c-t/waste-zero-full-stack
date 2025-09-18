import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: { type: String, default: "user" },
		skills: { type: [String], default: [] },
		location: { type: String },
		bio: { type: String },
	},
	{ timestamps: true }
);

export const User = model("User", userSchema);
