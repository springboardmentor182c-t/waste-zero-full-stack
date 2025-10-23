const User = require('../models/User');
const Opportunity = require('../models/Opportunity');
const Application = require('../models/Application');
const Message = require('../models/Message');
const AdminLog = require('../models/AdminLog');

/** Dashboard Service: Gather analytics */
async function getDashboardData() {
  try {
    const totalUsers = await User.countDocuments();
    const totalOpportunities = await Opportunity.countDocuments();
    const activeApplications = await Application.countDocuments({ status: "pending" });
    const totalMessages = await Message.countDocuments();
    const recentLogs = await AdminLog.find()
      .sort({ timestamp: -1 })
      .limit(5)
      .populate('user', 'name email role')
      .populate('actor', 'name email role');

    return {
      totalUsers,
      totalOpportunities,
      activeApplications,
      totalMessages,
      recentLogs,
    };
  } catch (err) {
    console.error("❌ Dashboard Service Error:", err?.message ?? err);
    throw err;
  }
}

module.exports = { getDashboardData };
