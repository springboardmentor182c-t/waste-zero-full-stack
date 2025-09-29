import { Router } from "express";
import * as messageController from "./messages.controller";

const router = Router();

router.post("/", messageController.createMessage);
router.get("/", messageController.getMessages);
router.get("/:id", messageController.getMessage);
router.put("/:id", messageController.updateMessage);
router.delete("/:id", messageController.deleteMessage);

export default router;
