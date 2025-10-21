// services/dashboard.service.js
import { User, Opportunity, Application, Message, AdminLog } from "../models/model.js";

/**
 * Dashboard Service
 * Fetches key metrics for Admin Dashboard.
 */
export async function getDashboardData() {
  try {
    // Count all users
    const totalUsers = await User.countDocuments();

    // Count all volunteering opportunities
    const totalOpportunities = await Opportunity.countDocuments();

    // Count active/pending applications
    const activeApplications = await Application.countDocuments({ status: "pending" });

    // Count total messages sent on the platform
    const totalMessages = await Message.countDocuments();

    // Fetch latest 5 admin logs (most recent actions)
    const recentLogs = await AdminLog.find()
      .sort({ timestamp: -1 })
      .limit(5)
      .populate("user", "name email role")     // who the log refers to
      .populate("actor", "name email role");   // admin who performed the action

    // Construct clean JSON object for the controller to send
    return {
      totalUsers,
      totalOpportunities,
      activeApplications,
      totalMessages,
      recentLogs,
    };
  } catch (error) {
    console.error("❌ Dashboard Service Error:", error.message);
    throw new Error("Failed to fetch dashboard analytics");
  }
}
