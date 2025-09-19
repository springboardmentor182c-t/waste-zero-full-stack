const userService = require("./user.service.js");

// ------------------ AUTH ------------------
exports.register = async (req, res, next) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const data = await userService.login(req.body);
    res.status(200).json({ success: true, ...data });
  } catch (err) {
    next(err);
  }
};

// ------------------ PROFILE ------------------
exports.getProfile = async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.user.id); // ✅ req.user.id comes from auth middleware
    res.status(200).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const user = await userService.updateProfile(req.user.id, req.body);
    res.status(200).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

exports.deleteProfile = async (req, res, next) => {
  try {
    await userService.deleteProfile(req.user.id);
    res.status(200).json({ success: true, message: "Profile deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// ------------------ HEALTH ------------------
exports.healthCheck = (req, res) => {
  res.json({ status: "API is working" });
};
