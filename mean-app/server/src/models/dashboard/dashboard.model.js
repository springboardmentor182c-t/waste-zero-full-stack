// models/model.js
// Mongoose schemas & model exports for WasteZero platform
// Assumes you have a separate config/db.js that connects mongoose:
// import './config/db.js'  // somewhere in app bootstrap

import mongoose from "mongoose";
const { Schema, model } = mongoose;

/**
 * User Schema
 * role: 'volunteer' | 'ngo' | 'admin'
 */
const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true }, // hashed password
    role: { type: String, enum: ["volunteer", "ngo", "admin"], default: "volunteer" },
    skills: [{ type: String, trim: true }],
    location: {
      address: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      // optionally store geo coordinates:
      coordinates: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], default: undefined }, // [lng, lat]
      },
    },
    bio: { type: String, maxlength: 1000 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 });
UserSchema.index({ "location.coordinates": "2dsphere" }); // if using geo queries

const User = model("User", UserSchema);

/**
 * Opportunity Schema
 */
const OpportunitySchema = new Schema(
  {
    ngo: { type: Schema.Types.ObjectId, ref: "User", required: true }, // ngo_id
    title: { type: String, required: true, trim: true, maxlength: 255 },
    description: { type: String, trim: true, maxlength: 5000 },
    required_skills: [{ type: String, trim: true }],
    duration: { type: String, trim: true }, // e.g., "2 days" or store as structured {value, unit}
    location: {
      address: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      coordinates: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], default: undefined }, // [lng, lat]
      },
    },
    status: { type: String, enum: ["open", "closed", "in-progress"], default: "open" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

OpportunitySchema.index({ title: "text", description: "text" });
OpportunitySchema.index({ "location.coordinates": "2dsphere" });

const Opportunity = model("Opportunity", OpportunitySchema);

/**
 * Application Schema
 */
const ApplicationSchema = new Schema(
  {
    opportunity: { type: Schema.Types.ObjectId, ref: "Opportunity", required: true },
    volunteer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
    appliedAt: { type: Date, default: Date.now },
    // optional fields
    message: { type: String, maxlength: 2000 },
  },
  { timestamps: true }
);

ApplicationSchema.index({ opportunity: 1 });
ApplicationSchema.index({ volunteer: 1 });

const Application = model("Application", ApplicationSchema);

/**
 * Message Schema
 */
const MessageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true, maxlength: 5000 },
    read: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

MessageSchema.index({ sender: 1, receiver: 1, timestamp: -1 });

const Message = model("Message", MessageSchema);

/**
 * AdminLog Schema
 */
const AdminLogSchema = new Schema(
  {
    action: { type: String, required: true }, // e.g., 'suspend_user', 'delete_opportunity'
    user: { type: Schema.Types.ObjectId, ref: "User" }, // user associated with action (optional)
    actor: { type: Schema.Types.ObjectId, ref: "User" }, // admin who performed the action
    metadata: { type: Schema.Types.Mixed }, // additional data (free-form)
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

AdminLogSchema.index({ timestamp: -1 });

const AdminLog = model("AdminLog", AdminLogSchema);

/**
 * Export models
 */
export { User, Opportunity, Application, Message, AdminLog };
