// routes/dashboard.route.js
import express from "express";
import { dashboard } from "../controllers/dashboard.controller.js";

const router = express.Router();

/**
 * @route GET /api/dashboard
 * @desc Fetch dashboard analytics for admin
 * @access Admin only
 */
router.get("/dashboard", dashboard);

export default router;
