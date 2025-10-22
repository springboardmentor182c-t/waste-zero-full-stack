// models/pickup.model.js
import mongoose from "mongoose";
const { Schema, model } = mongoose;


const PickupSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    wasteType: {
      type: String,
      enum: ["plastic", "organic", "e-waste", "metal", "paper"],
      required: true,
    },
    pickupDate: { type: String, required: true },
    pickupTime: { type: String, required: true },
    address: { type: String, required: true },
    additionalNotes: { type: String },
    status: {
      type: String,
      enum: ["scheduled", "in-progress", "completed", "cancelled"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

// Export the model
export const Pickup = model("Pickup", PickupSchema);
