import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface IPickup extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'completed' | 'pending';
  address: string;
  date: Date;
  status: string;
}

export interface IOpportunity extends Document {
  title: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

const pickupSchema = new Schema<IPickup>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['completed', 'pending'], required: true },
  address: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' }
}, { timestamps: true });

const opportunitySchema = new Schema<IOpportunity>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', userSchema);
export const Pickup = mongoose.model<IPickup>('Pickup', pickupSchema);
export const Opportunity = mongoose.model<IOpportunity>('Opportunity', opportunitySchema);