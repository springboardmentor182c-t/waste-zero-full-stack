import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../../models/user.model.js";
import { JWT_SECRET } from "../../../config/appConfig.js";

export const registerUser = async (data) => {
  const { name, email, password, role, skills, location, bio } = data;

  const existing = await User.findOne({ email }).lean();
  if (existing) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    skills,
    location,
    bio,
  });

  // remove password before returning
  const userObj = newUser.toObject();
  delete userObj.password;
  return userObj;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id.toString(), email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  const userObj = user.toObject();
  delete userObj.password;

  return { token, user: userObj };
};

export const logoutUser = () => {
  return { message: "Logged out successfully (client must delete token)" };
};
