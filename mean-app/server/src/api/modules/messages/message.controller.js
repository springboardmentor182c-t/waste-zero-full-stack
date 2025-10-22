const Message = require("./message.model");
const io = require("../../bin/www"); 


//  Send a message
exports.sendMessage = async (req, res) => {
  try {
    const { sender_id, receiver_id, content } = req.body;

    if (!sender_id || !receiver_id || !content) {
      return res.status(400).json({
        success: false,
        message: "sender_id, receiver_id, and content are required",
      });
    }

    const message = new Message({ sender_id, receiver_id, content });
    await message.save();

    io.to(receiver_id).emit("receiveMessage", message);

    res.status(201).json({
     success: true,
     message: "Message sent successfully",
     data: message,
     } );

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: message,
    });
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

//Get conversation between two users
exports.getConversation = async (req, res) => {
  try {
    const { user1_id, user2_id } = req.params;
    const limit = parseInt(req.query.limit) || 50;

    const messages = await Message.find({
      $or: [
        { sender_id: user1_id, receiver_id: user2_id },
        { sender_id: user2_id, receiver_id: user1_id },
      ],
    })
      .sort({ timestamp: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      data: messages.reverse(), // Show oldest first
    });
  } catch (error) {
    console.error("Get conversation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch conversation",
    });
  }
};

//Get all conversations for a user
exports.getUserConversations = async (req, res) => {
  try {
    const { user_id } = req.params;

    const messages = await Message.find({
      $or: [{ sender_id: user_id }, { receiver_id: user_id }],
    }).sort({ timestamp: -1 });

    // Group conversations by user
    const conversations = {};
    messages.forEach((msg) => {
      const otherUser = msg.sender_id === user_id ? msg.receiver_id : msg.sender_id;
      if (!conversations[otherUser]) {
        conversations[otherUser] = msg;
      }
    });

    res.status(200).json({
      success: true,
      data: Object.values(conversations),
    });
  } catch (error) {
    console.error("Get user conversations error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch conversations",
    });
  }
};

//Mark messages as read
exports.markAsRead = async (req, res) => {
  try {
    const { sender_id, receiver_id } = req.body;

    if (!sender_id || !receiver_id) {
      return res.status(400).json({
        success: false,
        message: "sender_id and receiver_id are required",
      });
    }

    await Message.updateMany(
      { sender_id, receiver_id, isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json({
      success: true,
      message: "Messages marked as read",
    });
  } catch (error) {
    console.error("Mark as read error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to mark messages as read",
    });
  }
};

//Delete a message
exports.deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    const deleted = await Message.findByIdAndDelete(messageId);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("Delete message error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete message",
    });
  }
};
