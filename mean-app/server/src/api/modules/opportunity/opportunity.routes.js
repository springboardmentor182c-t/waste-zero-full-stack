import express from "express";
import {
  createOpportunity,
  getOpportunities,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity
} from "./opportunity.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/opportunities:
 *   post:
 *     summary: Create an opportunity
 *     tags:
 *       - Opportunities
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Opportunity created
 */
router.post("/", createOpportunity);

/**
 * @swagger
 * /api/opportunities:
 *   get:
 *     summary: List opportunities
 *     tags:
 *       - Opportunities
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
 *         description: Number of items per page
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query to filter opportunities
 *     responses:
 *       200:
 *         description: A list of opportunities
 */
router.get("/", getOpportunities);

/**
 * @swagger
 * /api/opportunities/{id}:
 *   get:
 *     summary: Get opportunity by id
 *     tags:
 *       - Opportunities
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Opportunity object
 */
router.get("/:id", getOpportunityById);

/**
 * @swagger
 * /api/opportunities/{id}:
 *   put:
 *     summary: Update an opportunity
 *     tags:
 *       - Opportunities
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Opportunity updated
 */
router.put("/:id", updateOpportunity);

/**
 * @swagger
 * /api/opportunities/{id}:
 *   delete:
 *     summary: Delete an opportunity
 *     tags:
 *       - Opportunities
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Opportunity deleted
 */
router.delete("/:id", deleteOpportunity);

export default router;
