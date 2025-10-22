import express from "express";
import Pickup from "../../models/pickup/Pickup.js";

const router = express.Router();

// Schedule a new pickup
router.post("/schedule", async (req, res) => {
  try {
    const { name, address, contactNumber, pickupDate, items } = req.body;

    if (!name || !address || !contactNumber || !pickupDate || !items) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPickup = new Pickup({ name, address, contactNumber, pickupDate, items });
    await newPickup.save();

    res.status(201).json({ message: "Pickup scheduled successfully", pickup: newPickup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all pickups (for admin)
router.get("/all", async (req, res) => {
  try {
    const pickups = await Pickup.find().sort({ pickupDate: 1 });
    res.json(pickups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
