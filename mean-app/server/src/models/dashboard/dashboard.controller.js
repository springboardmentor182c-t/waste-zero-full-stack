// controllers/dashboard.controller.js
import { getDashboardData } from "../services/dashboard.service.js";


export async function dashboard(req, res) {
  try {
    // Check if the logged-in user is an Admin
    if (req.user?.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const data = await getDashboardData();

    res.status(200).json({
      message: "Dashboard analytics fetched successfully",
      data,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Dashboard Controller Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
