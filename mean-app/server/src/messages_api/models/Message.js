const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true, trim: true },
  receiver: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true, maxLength: 1000 },
  timestamp: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
  messageType: { type: String, enum: ['text', 'image', 'file'], default: 'text' }
});

// Indexes for better performance
messageSchema.index({ sender: 1, receiver: 1, timestamp: -1 });
messageSchema.index({ receiver: 1, isRead: 1 });

module.exports = mongoose.model('Message', messageSchema);
