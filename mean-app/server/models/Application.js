const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  opportunity: { type: mongoose.Schema.Types.ObjectId, ref: 'Opportunity', required: true },
  volunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  message: { type: String, maxlength: 2000 },
  appliedAt: { type: Date, default: Date.now }
}, { timestamps: true });

applicationSchema.index({ opportunity: 1 });
applicationSchema.index({ volunteer: 1 });

module.exports = mongoose.model('Application', applicationSchema);
