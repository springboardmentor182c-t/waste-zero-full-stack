import express from "express";
import * as messagesController from "./message.controller.js";
import auth from "../../middleware/auth.js";

const router = express.Router();

// Get available users for messaging - requires auth
/**
 * @swagger
 * /api/v1/messages/users:
 *   get:
 *     summary: Get available users for messaging
 *     tags:
 *       - Messages
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users available for messaging
 */
router.get("/users", auth, messagesController.getAvailableUsers);

// Send a message
/**
 * @swagger
 * /api/v1/messages/send:
 *   post:
 *     summary: Send a message
 *     tags:
 *       - Messages
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message sent
 */
router.post("/send", messagesController.sendMessage);

// Get conversation between two users
/**
 * @swagger
 * /api/v1/messages/conversation/{user1_id}/{user2_id}:
 *   get:
 *     summary: Get conversation between two users
 *     tags:
 *       - Messages
 *     parameters:
 *       - in: path
 *         name: user1_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: user2_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Conversation messages
 */
router.get("/conversation/:user1_id/:user2_id", messagesController.getConversation);

// Get all conversations for a user
/**
 * @swagger
 * /api/v1/messages/conversations/{user_id}:
 *   get:
 *     summary: Get all conversations for a user
 *     tags:
 *       - Messages
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Results per page
 *     responses:
 *       200:
 *         description: User's conversations
 */
router.get("/conversations/:user_id", messagesController.getUserConversations);

// Mark messages as read
/**
 * @swagger
 * /api/v1/messages/mark-read:
 *   put:
 *     summary: Mark messages as read
 *     tags:
 *       - Messages
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               conversationId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Messages marked as read
 */
router.put("/mark-read", messagesController.markAsRead);

// Delete a message
/**
 * @swagger
 * /api/v1/messages/{messageId}:
 *   delete:
 *     summary: Delete a message
 *     tags:
 *       - Messages
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Message deleted
 */
router.delete("/:messageId", messagesController.deleteMessage);

export default router;

