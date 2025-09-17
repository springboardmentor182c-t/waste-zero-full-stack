import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "../../../models/user.model.js";
import { JWT_SECRET } from "../../../config/appConfig.js";

export const registerUser = async (data) => {
  const { name, email, password, role, skills, location, bio } = data;

  const existing = users.find((u) => u.email === email);
  if (existing) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password: hashedPassword,
    role,
    skills,
    location,
    bio,
  };

  users.push(newUser);
  return newUser;
};

export const loginUser = async ({ email, password }) => {
  const user = users.find((u) => u.email === email);
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token, user };
};

export const logoutUser = () => {
  return { message: "Logged out successfully (client must delete token)" };
};
