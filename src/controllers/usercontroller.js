const mongoose = require('mongoose');
const User = require('../models/user');

// ✅ Get profile
exports.getProfile = async (req, res) => {
  console.log("👉 GET /users/:id called with:", req.params.id);

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid user id' });
  }

  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error("❌ Error in getProfile:", err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// ✅ Update profile
exports.updateProfile = async (req, res) => {
  console.log("👉 PUT /users/:id called with:", req.params.id);

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid user id' });
  }

  try {
    const { bio, skills, location } = req.body;

    const updates = {
      bio,
      location,
      skills: Array.isArray(skills)
        ? skills
        : skills
        ? skills.split(',')
        : []
    };

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({
      message: 'Profile updated successfully',
      user
    });
  } catch (err) {
    console.error("❌ Error in updateProfile:", err);
    return res.status(500).json({ error: 'Server error' });
  }
};
