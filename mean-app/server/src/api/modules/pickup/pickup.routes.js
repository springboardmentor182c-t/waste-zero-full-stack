import express from "express";
import { createPickup, getUserPickups, getAllPickups, getPickupById, cancelPickup } from "./Pickup.controller.js";
import auth from "../../../api/middleware/auth.js";

const router = express.Router();

// Schedule a new pickup - requires auth
/**
 * @swagger
 * /api/v1/pickup/schedule:
 *   post:
 *     summary: Schedule a new pickup
 *     tags:
 *       - Pickup
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Pickup scheduled
 */
router.post("/schedule", auth, createPickup);

// Get pickups for current user - requires auth
/**
 * @swagger
 * /api/v1/pickup/my:
 *   get:
 *     summary: Get pickups for current user
 *     tags:
 *       - Pickup
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: List of user's pickups
 */
router.get("/my", auth, getUserPickups);

// Get all pickups (for admin) - requires auth
/**
 * @swagger
 * /api/v1/pickup/all:
 *   get:
 *     summary: Get all pickups (admin)
 *     tags:
 *       - Pickup
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by pickup status (scheduled, cancelled, completed)
 *     responses:
 *       200:
 *         description: All pickups
 */
router.get("/all", auth, getAllPickups);

// Cancel pickup - Must be before /:id to avoid conflicts - requires auth
/**
 * @swagger
 * /api/v1/pickup/cancel/{id}:
 *   put:
 *     summary: Cancel a pickup
 *     tags:
 *       - Pickup
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pickup cancelled
 */
router.put("/cancel/:id", auth, cancelPickup);

// Get pickup by ID - Keep this last to avoid route conflicts
/**
 * @swagger
 * /api/v1/pickup/{id}:
 *   get:
 *     summary: Get pickup by id
 *     tags:
 *       - Pickup
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pickup object
 */
router.get("/:id", getPickupById);

export default router;
