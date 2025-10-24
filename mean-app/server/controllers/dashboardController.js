const { getDashboardData } = require('../services/dashboardService');

/**
 * GET /api/dashboard
 * Admin-only dashboard analytics
 */
exports.dashboard = async (req, res) => {
  try {
    // You already have role-based middleware, ensure it's in use on the route
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const data = await getDashboardData();
    return res.status(200).json({
      message: "Dashboard analytics fetched successfully",
      data,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error("❌ Dashboard Controller Error:", error?.message ?? error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
