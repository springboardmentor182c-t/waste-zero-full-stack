
import Message from "./message.model";

const Message = require("./message.model");

// Save a new message
async function sendMessage(data) {
  const { senderId, receiverId, content } = data;
  const message = new Message({ senderId, receiverId, content });
  await message.save();
  return message;
}

//Get chat history between two users
async function getMessages(req, res) {
  try {
    const { senderId, receiverId } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  sendMessage,
  getMessages,
};
