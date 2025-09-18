
const authService = require("./user.service.js");

exports.register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);
    res.status(200).json({ success: true, ...data });
  } catch (err) {
    next(err);
  }
};

exports.healthCheck = (req, res) => {
  res.json({ status: "API is working " });
};
