import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  text: string;
  sender: string;
  receiver: string;  
  createdAt: Date;
}

const MessageSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
    sender: { type: String, required: true },
    receiver: { type: String, required: true },  
  },
  { timestamps: true }
);

export default mongoose.model<IMessage>("Message", MessageSchema);
