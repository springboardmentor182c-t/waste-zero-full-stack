// import { Request, Response } from "express";
// import * as messageService from "./messages.service";

// // CREATE
// export const createMessage = async (req: Request, res: Response) => {
//   try {
//     const message = await messageService.createMessage(req.body);
//     res.status(201).json(message);
//   } catch (err: any) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // GET ALL
// export const getMessages = async (req: Request, res: Response) => {
//   try {
//     const messages = await messageService.getMessages();
//     res.json(messages);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // GET BY ID
// export const getMessage = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     if (!id) {
//       return res.status(400).json({ error: "Message ID is required" });
//     }
//     const message = await messageService.getMessageById(id);
//     res.json(message);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // UPDATE
// export const updateMessage = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     if (!id) {
//       return res.status(400).json({ error: "Message ID is required" });
//     }
//     const message = await messageService.updateMessage(id, req.body);
//     res.json(message);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // DELETE
// export const deleteMessage = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     if (!id) {
//       return res.status(400).json({ error: "Message ID is required" });
//     }
//     const result = await messageService.deleteMessage(id);
//     res.json(result);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };
import { Request, Response } from "express";
import * as messageService from "./messages.service";

// Create a new message
export const createMessage = async (req: Request, res: Response) => {
  try {
    const message = await messageService.createMessage(req.body);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: "Failed to create message" });
  }
};

// Get all messages
export const getMessages = async (_req: Request, res: Response) => {
  try {
    const messages = await messageService.getMessages();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// Get a single message by ID
export const getMessage = async (req: Request, res: Response) => {
  try {
    const message = await messageService.getMessageById(req.params.id!);

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.json(message);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch message" });
  }
};

// Update a message
export const updateMessage = async (req: Request, res: Response) => {
  try {
    const updatedMessage = await messageService.updateMessage(req.params.id!, req.body);

    if (!updatedMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.json({ message: "Message updated successfully", updatedMessage });
  } catch (error) {
    res.status(500).json({ error: "Failed to update message" });
  }
};

// Delete a message
export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const deletedMessage = await messageService.deleteMessage(req.params.id!);

    if (!deletedMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.json({ message: "Message deleted successfully", deletedMessage });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete message" });
  }
};
