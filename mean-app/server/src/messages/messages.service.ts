import Message, { IMessage } from "./messages.model";

export const createMessage = async (data: Partial<IMessage>) => {
  const message = new Message(data);
  return await message.save();
};

export const getMessages = async () => {
  return await Message.find();
};

export const getMessageById = async (id: string) => {
  return await Message.findById(id);
};

export const updateMessage = async (id: string, data: Partial<IMessage>) => {
  return await Message.findByIdAndUpdate(id, data, { new: true });
};

export const deleteMessage = async (id: string) => {
  return await Message.findByIdAndDelete(id);
};
