import express from "express";
import  Pickup  from "../pickup/Pickup.model.js";


 export const createPickup = async (req, res) => {
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
}

// Get all pickups (for admin)
export const getAllPickups =  async (req, res) => {
  try {
    const pickups = await Pickup.find().sort({ pickupDate: 1 });
    res.json(pickups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
