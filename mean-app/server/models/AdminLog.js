const mongoose = require('mongoose');

const adminLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  metadata: mongoose.Schema.Types.Mixed,
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

adminLogSchema.index({ timestamp: -1 });

module.exports = mongoose.model('AdminLog', adminLogSchema);
