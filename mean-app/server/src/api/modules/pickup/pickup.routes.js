import express from "express";
import { createPickup, getUserPickups, getAllPickups, getPickupById, cancelPickup } from "./Pickup.controller.js";
import auth from "../../../api/middleware/auth.js";

const router = express.Router();

// Schedule a new pickup - requires auth
router.post("/schedule", auth, createPickup);

// Get pickups for current user - requires auth
router.get("/my", auth, getUserPickups);

// Get all pickups (for admin) - requires auth
router.get("/all", auth, getAllPickups);

// Cancel pickup - Must be before /:id to avoid conflicts - requires auth
router.put("/cancel/:id", auth, cancelPickup);

// Get pickup by ID - Keep this last to avoid route conflicts
router.get("/:id", getPickupById);

export default router;
