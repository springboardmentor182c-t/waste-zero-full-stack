// services/dashboard.service.js
import { DashboardModel } from "../models/dashboard.model.js";

/**
 * Service Layer - Handles database interactions for dashboard analytics.
 */
export async function getDashboardData() {
  try {
    // Delegates logic to the model (data access layer)
    const stats = await DashboardModel.fetchAnalytics();
    return stats;
  } catch (error) {
    console.error("❌ Dashboard Service Error:", error.message);
    throw error;
  }
}
