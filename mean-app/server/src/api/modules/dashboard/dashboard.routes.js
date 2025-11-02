import express from "express";
import { dashboard } from "./dashboard.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/dashboard:
 *   get:
 *     summary: Get dashboard statistics
 *     tags:
 *       - Dashboard
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for dashboard data (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for dashboard data (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Dashboard data
 */
router.get("/", dashboard);

export default router;
