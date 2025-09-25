const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// 1. SEND MESSAGE
router.post('/send', async (req, res) => {
  try {
    const { sender, receiver, content, messageType = 'text' } = req.body;

    if (!sender || !receiver || !content) {
      return res.status(400).json({ success: false, message: 'Sender, receiver, and content are required' });
    }

    if (content.length > 1000) {
      return res.status(400).json({ success: false, message: 'Message too long (max 1000 chars)' });
    }

    const newMessage = new Message({ sender, receiver, content, messageType });
    const savedMessage = await newMessage.save();

    res.status(201).json({ success: true, message: 'Message sent', data: savedMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send message', error: error.message });
  }
});

// 2. GET ALL MESSAGES FOR A USER
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20, otherUser } = req.query;

    let query = { $or: [{ sender: userId }, { receiver: userId }] };

    if (otherUser) {
      query = { $or: [{ sender: userId, receiver: otherUser }, { sender: otherUser, receiver: userId }] };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const messages = await Message.find(query).sort({ timestamp: -1 }).skip(skip).limit(parseInt(limit)).lean();
    const totalMessages = await Message.countDocuments(query);
    const totalPages = Math.ceil(totalMessages / parseInt(limit));

    res.json({
      success: true,
      data: { messages, pagination: { currentPage: parseInt(page), totalPages, totalMessages } }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve messages', error: error.message });
  }
});

// 3. GET UNREAD MESSAGES
router.get('/:userId/unread', async (req, res) => {
  try {
    const { userId } = req.params;
    const unreadMessages = await Message.find({ receiver: userId, isRead: false }).sort({ timestamp: -1 });

    res.json({ success: true, data: { messages: unreadMessages, unreadCount: unreadMessages.length } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve unread messages', error: error.message });
  }
});

// 4. MARK MESSAGE AS READ
router.put('/:messageId/read', async (req, res) => {
  try {
    const { messageId } = req.params;
    const updatedMessage = await Message.findByIdAndUpdate(messageId, { isRead: true }, { new: true });

    if (!updatedMessage) return res.status(404).json({ success: false, message: 'Message not found' });

    res.json({ success: true, message: 'Message marked as read', data: updatedMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to mark message as read', error: error.message });
  }
});

// 5. DELETE MESSAGE
router.delete('/:messageId', async (req, res) => {
  try {
    const { messageId } = req.params;
    const { userId } = req.query;

    let query = { _id: messageId };
    if (userId) query.$or = [{ sender: userId }, { receiver: userId }];

    const deletedMessage = await Message.findOneAndDelete(query);
    if (!deletedMessage) return res.status(404).json({ success: false, message: 'Message not found or unauthorized' });

    res.json({ success: true, message: 'Message deleted', data: { deletedMessageId: messageId } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete message', error: error.message });
  }
});

// 6. GET CONVERSATION PARTNERS
router.get('/:userId/conversations', async (req, res) => {
  try {
    const { userId } = req.params;

    const conversations = await Message.aggregate([
      { $match: { $or: [{ sender: userId }, { receiver: userId }] } },
      {
        $addFields: {
          otherUser: { $cond: { if: { $eq: ['$sender', userId] }, then: '$receiver', else: '$sender' } }
        }
      },
      {
        $group: {
          _id: '$otherUser',
          lastMessage: { $first: '$content' },
          lastMessageTime: { $first: '$timestamp' },
          unreadCount: {
            $sum: { $cond: [{ $and: [{ $eq: ['$receiver', userId] }, { $eq: ['$isRead', false] }] }, 1, 0] }
          }
        }
      },
      { $sort: { lastMessageTime: -1 } }
    ]);

    res.json({ success: true, data: conversations });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get conversations', error: error.message });
  }
});

module.exports = router;
