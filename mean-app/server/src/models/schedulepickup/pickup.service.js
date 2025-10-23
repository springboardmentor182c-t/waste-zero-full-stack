// services/pickup.service.js
import { Pickup } from "../models/pickup.model.js";

export const PickupService = {
  /**
   * Create a new pickup
   */
  async createPickup(data) {
    try {
      const pickup = new Pickup(data);
      await pickup.save();
      return pickup;
    } catch (error) {
      console.error("❌ PickupService.createPickup Error:", error.message);
      throw new Error("Failed to schedule pickup");
    }
  },

  /**
   * Get all pickups for a user
   */
  async getUserPickups(userId) {
    try {
      return await Pickup.find({ user: userId }).sort({ createdAt: -1 });
    } catch (error) {
      console.error("❌ PickupService.getUserPickups Error:", error.message);
      throw new Error("Failed to fetch user pickups");
    }
  },

  /**
   * Update status of a pickup (admin or agent)
   */
  async updatePickupStatus(pickupId, status) {
    try {
      return await Pickup.findByIdAndUpdate(
        pickupId,
        { status },
        { new: true }
      );
    } catch (error) {
      console.error("❌ PickupService.updatePickupStatus Error:", error.message);
      throw new Error("Failed to update pickup status");
    }
  },
};
