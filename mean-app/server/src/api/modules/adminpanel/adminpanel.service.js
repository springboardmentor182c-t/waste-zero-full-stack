import { AdminLog } from "./adminpanel.model.js";
import User from "../user/user.model.js"; // adjust path to your User model

async function getAllUsers() {
  return User.find({});
}

async function addAdminLog(log) {
  const adminLog = new AdminLog(log);
  return adminLog.save();
}

export { getAllUsers, addAdminLog };
