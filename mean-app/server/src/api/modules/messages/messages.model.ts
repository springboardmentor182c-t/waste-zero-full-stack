import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  sender_id: string;
  receiver_id: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

const MessageSchema: Schema = new Schema({
  sender_id: {
    type: String,
    required: true,
    index: true
  },
  receiver_id: {
    type: String,
    required: true,
    index: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Compound index for faster queries
MessageSchema.index({ sender_id: 1, receiver_id: 1, timestamp: -1 });

export const Message = mongoose.model<IMessage>('Message', MessageSchema);