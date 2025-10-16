// models/dashboard.model.js
import db from "../config/db.js"; // Your Sequelize/Mongoose instance

/**
 * Model: DashboardModel
 * Responsible for querying DB and returning aggregate analytics.
 */
export const DashboardModel = {
  async fetchAnalytics() {
    try {
      const totalUsers = await db.Users.count();
      const totalOpportunities = await db.Opportunities.count();
      const activeApplications = await db.Applications.count({ where: { status: "pending" } });
      const totalMessages = await db.Messages.count();
      const recentLogs = await db.AdminLogs.findAll({
        limit: 5,
        order: [["timestamp", "DESC"]],
      });

      return {
        totalUsers,
        totalOpportunities,
        activeApplications,
        totalMessages,
        recentLogs,
      };
    } catch (error) {
      console.error("❌ Dashboard Model Error:", error.message);
      throw error;
    }
  },
};
