const mongoose = require('mongoose');
const User = require('../models/User');

/** @desc Get user profile by ID */
exports.getProfile = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).json({ error: 'Invalid user id' });

  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    console.error("❌ Error in getProfile:", err);
    res.status(500).json({ error: 'Server error' });
  }
};

/** @desc Update user profile */
exports.updateProfile = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).json({ error: 'Invalid user id' });

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

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({
      message: 'Profile updated successfully',
      user
    });
  } catch (err) {
    console.error("❌ Error in updateProfile:", err);
    res.status(500).json({ error: 'Server error' });
  }
};
