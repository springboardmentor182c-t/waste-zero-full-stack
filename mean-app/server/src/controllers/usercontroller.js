const mongoose = require("mongoose");
const User = require("../models/User");

/** 
 * @desc Get user profile by ID 
 */
exports.getProfile = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, error: "Invalid user id" });
    }

    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.json({ success: true, data: user });
  } catch (err) {
    console.error("❌ Error in getProfile:", err);
    next(err);
  }
};

/** 
 * @desc Update user profile 
 */
exports.updateProfile = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, error: "Invalid user id" });
    }

    const { bio, skills, location } = req.body;

    const updates = {
      bio,
      location,
      skills: Array.isArray(skills)
        ? skills
        : skills
        ? skills.split(",").map((s) => s.trim())
        : [],
    };

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (err) {
    console.error("❌ Error in updateProfile:", err);
    next(err);
  }
};

/** 
 * @desc List users with pagination 
 */
exports.listUsers = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, parseInt(req.query.limit, 10) || 20);
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find().select("-password").skip(skip).limit(limit).lean(),
      User.countDocuments(),
    ]);

    res.json({
      success: true,
      data: {
        users,
        meta: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (err) {
    console.error("❌ Error in listUsers:", err);
    next(err);
  }
};
