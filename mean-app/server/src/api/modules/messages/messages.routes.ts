import { Router } from 'express';
import { MessagesController } from './messages.controller';

const router = Router();
const messagesController = new MessagesController();

// Send a message
router.post('/send', (req, res) => messagesController.sendMessage(req, res));

// Get conversation between two users
router.get('/conversation/:user1_id/:user2_id', (req, res) => 
  messagesController.getConversation(req, res)
);

// Get all conversations for a user
router.get('/conversations/:user_id', (req, res) => 
  messagesController.getUserConversations(req, res)
);

// Mark messages as read
router.put('/mark-read', (req, res) => messagesController.markAsRead(req, res));

// Delete a message
router.delete('/:messageId', (req, res) => messagesController.deleteMessage(req, res));

export default router;