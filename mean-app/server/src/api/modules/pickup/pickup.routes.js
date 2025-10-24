import express from "express";
import { createPickup, getAllPickups } from "./Pickup.controller.js";

const router = express.Router();

// Schedule a new pickup
router.post("/schedule", createPickup)


// Get all pickups (for admin)
router.get("/all", getAllPickups);


export default router;
