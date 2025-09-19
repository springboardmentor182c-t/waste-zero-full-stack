import * as userService from "./user.service.js";

export const register = async (req, res, next) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await userService.loginUser(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  const result = userService.logoutUser();
  res.json(result);
};

// Get user by ID
export const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// Create user (profile, not register)
export const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    next(err);
  }
};

// Update user profile
export const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json({ message: "User updated", user });
  } catch (err) {
    next(err);
  }
};

// Delete user
export const deleteUser = async (req, res, next) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    res.json({ message: "User deleted", user });
  } catch (err) {
    next(err);
  }
};
