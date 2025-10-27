// routes/pickup.route.js
import express from "express";
import { PickupController } from "../controllers/pickup.controller.js";

const router = express.Router();

// Schedules a new pickup for a user
router.post("/pickups/schedule", PickupController.create);
// Retrieves all pickups for a given user
router.get("/pickups/user/:userId", PickupController.getUserPickups);
// Updates the status of a specific pickup
router.put("/pickups/:pickupId/status", PickupController.updateStatus);

export default router;
