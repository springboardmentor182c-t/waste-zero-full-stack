// routes/pickup.route.js
import express from "express";
import { PickupController } from "../controllers/pickup.controller.js";

const router = express.Router();

/**
 * Pickup Routes
 */
router.post("/pickups/schedule", PickupController.create);
router.get("/pickups/user/:userId", PickupController.getUserPickups);
router.put("/pickups/:pickupId/status", PickupController.updateStatus);

export default router;
