import express from "express";
import * as userController from "./user.controller.js";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

export default router;
