// controllers/pickup.controller.js
import { PickupService } from "../services/pickup.service.js";

/**
 * Pickup Controller
 * Handles scheduling, viewing, and updating pickup requests.
 */
export const PickupController = {
  /** POST /api/pickups/schedule */
  async create(req, res) {
    try {
      const userId = req.user?._id; // requires authentication middleware
      if (!userId) return res.status(401).json({ error: "Unauthorized" });

      const pickupData = { ...req.body, user: userId };
      const pickup = await PickupService.createPickup(pickupData);

      res.status(201).json({
        message: "Pickup scheduled successfully",
        pickup,
      });
    } catch (error) {
      console.error("❌ PickupController.create Error:", error.message);
      res.status(500).json({ error: "Failed to schedule pickup" });
    }
  },

  /** GET /api/pickups/user/:userId */
  async getUserPickups(req, res) {
    try {
      const { userId } = req.params;
      const pickups = await PickupService.getUserPickups(userId);
      res.status(200).json({ pickups });
    } catch (error) {
      console.error("❌ PickupController.getUserPickups Error:", error.message);
      res.status(500).json({ error: "Failed to fetch pickups" });
    }
  },

  /** PUT /api/pickups/:pickupId/status */
  async updateStatus(req, res) {
    try {
      const { pickupId } = req.params;
      const { status } = req.body;
      const updatedPickup = await PickupService.updatePickupStatus(
        pickupId,
        status
      );
      res.status(200).json({
        message: "Pickup status updated",
        updatedPickup,
      });
    } catch (error) {
      console.error("❌ PickupController.updateStatus Error:", error.message);
      res.status(500).json({ error: "Failed to update pickup status" });
    }
  },
};
