import express from "express";
import * as userController from "./user.controller.js"; 
import auth from "../../middleware/auth.js";

const router = express.Router();
// -------- AUTH --------
/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */
router.post("/auth/signup", userController.register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login success, returns token
 */
router.post("/auth/login", userController.login);

// -------- PROFILE --------
/**
 * @swagger
 * /api/v1/profile:
 *   get:
 *     summary: Get current user profile
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 */
router.get("/profile", auth, userController.getProfile);

/**
 * @swagger
 * /api/v1/profile:
 *   put:
 *     summary: Update current user profile
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated
 */
router.put("/profile", auth, userController.updateProfile);

/**
 * @swagger
 * /api/v1/profile:
 *   delete:
 *     summary: Delete current user
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: User deleted
 */
router.delete("/profile", auth, userController.deleteProfile);
// Password update
/**
 * @swagger
 * /api/v1/profile/password:
 *   put:
 *     summary: Update user password
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated
 */
router.put('/profile/password', auth, userController.updatePassword);
export default router;