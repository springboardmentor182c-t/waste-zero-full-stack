import express from "express";
import * as adminController from "./adminpanel.controller.js";
import auth from "../../middleware/auth.js";

const router = express.Router();

// All admin routes require authentication
router.use(auth);

// Dashboard statistics
/**
 * @swagger
 * /api/v1/admin/stats:
 *   get:
 *     summary: Get admin dashboard statistics
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Stats object
 */
router.get("/stats", adminController.getDashboardStats);

// User management
/**
 * @swagger
 * /api/v1/admin/users:
 *   get:
 *     summary: Get list of users
 *     tags:
 *       - Admin
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
 *           default: 20
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Filter by user role
 *     responses:
 *       200:
 *         description: Users list
 */
router.get("/users", adminController.getUsers);

/**
 * @swagger
 * /api/v1/admin/users/{id}:
 *   get:
 *     summary: Get user by id
 *     tags:
 *       - Admin
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
 *         description: User object
 */
router.get("/users/:id", adminController.getUserById);

/**
 * @swagger
 * /api/v1/admin/users/{id}:
 *   put:
 *     summary: Update user
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
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
 *         description: User updated
 */
router.put("/users/:id", adminController.updateUser);

/**
 * @swagger
 * /api/v1/admin/users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted
 */
router.delete("/users/:id", adminController.deleteUser);

// Pickups and Opportunities
/**
 * @swagger
 * /api/v1/admin/pickups:
 *   get:
 *     summary: Get all pickups (admin)
 *     tags:
 *       - Admin
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
 *         description: Filter by status
 *     responses:
 *       200:
 *         description: All pickups
 */
router.get("/pickups", adminController.getAllPickups);

/**
 * @swagger
 * /api/v1/admin/opportunities:
 *   get:
 *     summary: Get all opportunities (admin)
 *     tags:
 *       - Admin
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
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query
 *     responses:
 *       200:
 *         description: All opportunities
 */
router.get("/opportunities", adminController.getAllOpportunities);

// Reports
/**
 * @swagger
 * /api/v1/admin/reports/users:
 *   get:
 *     summary: Generate users report
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Users report
 */
router.get("/reports/users", adminController.generateUsersReport);

/**
 * @swagger
 * /api/v1/admin/reports/pickups:
 *   get:
 *     summary: Generate pickups report
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Pickups report
 */
router.get("/reports/pickups", adminController.generatePickupsReport);

/**
 * @swagger
 * /api/v1/admin/reports/opportunities:
 *   get:
 *     summary: Generate opportunities report
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Opportunities report
 */
router.get("/reports/opportunities", adminController.generateOpportunitiesReport);

/**
 * @swagger
 * /api/v1/admin/reports/full-activity:
 *   get:
 *     summary: Generate full activity report
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Full activity report
 */
router.get("/reports/full-activity", adminController.generateFullActivityReport);

// Admin logs
/**
 * @swagger
 * /api/v1/admin/logs:
 *   get:
 *     summary: Get admin logs
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin logs
 */
router.get("/logs", adminController.getAdminLogs);

/**
 * @swagger
 * /api/v1/admin/logs:
 *   post:
 *     summary: Create an admin log
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Admin log created
 */
router.post("/logs", adminController.createAdminLog);

// Sample data creation (for testing)
/**
 * @swagger
 * /api/v1/admin/sample-data:
 *   post:
 *     summary: Create sample data (testing)
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Sample data created
 */
router.post("/sample-data", adminController.createSampleData);

export default router;
