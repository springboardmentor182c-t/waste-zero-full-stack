import { Request, Response } from 'express';
import { MessagesService } from './messages.service';

const messagesService = new MessagesService();

export class MessagesController {
  // Send a message
  async sendMessage(req: Request, res: Response): Promise<void> {
    try {
      const { sender_id, receiver_id, content } = req.body;

      if (!sender_id || !receiver_id || !content) {
        res.status(400).json({ 
          success: false, 
          message: 'sender_id, receiver_id, and content are required' 
        });
        return;
      }

      const message = await messagesService.createMessage(sender_id, receiver_id, content);
      
      res.status(201).json({
        success: true,
        message: 'Message sent successfully',
        data: message
      });
    } catch (error) {
      console.error('Send message error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to send message' 
      });
    }
  }

  // Get conversation between two users
  async getConversation(req: Request, res: Response): Promise<void> {
    try {
      const { user1_id, user2_id } = req.params;
      const limit = parseInt(req.query.limit as string) || 50;

      const messages = await messagesService.getConversation(user1_id, user2_id, limit);
      
      res.status(200).json({
        success: true,
        data: messages.reverse() // Oldest first for display
      });
    } catch (error) {
      console.error('Get conversation error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch conversation' 
      });
    }
  }

  // Get all conversations for a user
  async getUserConversations(req: Request, res: Response): Promise<void> {
    try {
      const { user_id } = req.params;

      const conversations = await messagesService.getUserConversations(user_id);
      
      res.status(200).json({
        success: true,
        data: conversations
      });
    } catch (error) {
      console.error('Get user conversations error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch conversations' 
      });
    }
  }

  // Mark messages as read
  async markAsRead(req: Request, res: Response): Promise<void> {
    try {
      const { sender_id, receiver_id } = req.body;

      if (!sender_id || !receiver_id) {
        res.status(400).json({ 
          success: false, 
          message: 'sender_id and receiver_id are required' 
        });
        return;
      }

      await messagesService.markAsRead(sender_id, receiver_id);
      
      res.status(200).json({
        success: true,
        message: 'Messages marked as read'
      });
    } catch (error) {
      console.error('Mark as read error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to mark messages as read' 
      });
    }
  }

  // Delete a message
  async deleteMessage(req: Request, res: Response): Promise<void> {
    try {
      const { messageId } = req.params;

      const deleted = await messagesService.deleteMessage(messageId);
      
      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Message not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Message deleted successfully'
      });
    } catch (error) {
      console.error('Delete message error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to delete message' 
      });
    }
  }
}