import * as adminService from "./adminpanel.service.js";

async function getUsers(req, res) {
  try {
    const users = await adminService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
}

async function createAdminLog(req, res) {
  try {
    const newLog = await adminService.addAdminLog(req.body);
    res.status(201).json(newLog);
  } catch (err) {
    res.status(500).json({ error: "Failed to log admin action" });
  }
}

export { getUsers, createAdminLog };
