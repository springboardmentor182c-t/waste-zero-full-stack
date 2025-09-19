const User = require("./user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ------------------ AUTH ------------------
exports.register = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  return user;
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token, user };
};

// ------------------ PROFILE ------------------
exports.getProfile = async (userId) => {
  const user = await User.findById(userId).select("-password"); // password hide
  if (!user) throw new Error("User not found");
  return user;
};

exports.updateProfile = async (userId, updates) => {
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }

  const user = await User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!user) throw new Error("User not found");
  return user;
};

exports.deleteProfile = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) throw new Error("User not found");
  return user;
};
