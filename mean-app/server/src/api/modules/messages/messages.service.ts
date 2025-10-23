import { Message, IMessage } from './messages.model';

export class MessagesService {
  // Create a new message
  async createMessage(sender_id: string, receiver_id: string, content: string): Promise<IMessage> {
    const message = new Message({
      sender_id,
      receiver_id,
      content,
      timestamp: new Date()
    });
    
    return await message.save();
  }

  // Get conversation between two users
  async getConversation(user1_id: string, user2_id: string, limit: number = 50): Promise<IMessage[]> {
    return await Message.find({
      $or: [
        { sender_id: user1_id, receiver_id: user2_id },
        { sender_id: user2_id, receiver_id: user1_id }
      ]
    })
    .sort({ timestamp: -1 })
    .limit(limit)
    .exec();
  }

  // Get all conversations for a user (list of users they've chatted with)
  async getUserConversations(user_id: string): Promise<any[]> {
    const messages = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender_id: user_id },
            { receiver_id: user_id }
          ]
        }
      },
      {
        $sort: { timestamp: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$sender_id', user_id] },
              '$receiver_id',
              '$sender_id'
            ]
          },
          lastMessage: { $first: '$$ROOT' },
          unreadCount: {
            $sum: {
              $cond: [
                { 
                  $and: [
                    { $eq: ['$receiver_id', user_id] },
                    { $eq: ['$isRead', false] }
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      },
      {
        $sort: { 'lastMessage.timestamp': -1 }
      }
    ]);

    return messages;
  }

  // Mark messages as read
  async markAsRead(sender_id: string, receiver_id: string): Promise<void> {
    await Message.updateMany(
      {
        sender_id: sender_id,
        receiver_id: receiver_id,
        isRead: false
      },
      {
        $set: { isRead: true }
      }
    );
  }

  // Get single message by ID
  async getMessageById(messageId: string): Promise<IMessage | null> {
    return await Message.findById(messageId);
  }

  // Delete a message
  async deleteMessage(messageId: string): Promise<boolean> {
    const result = await Message.findByIdAndDelete(messageId);
    return result !== null;
  }
}