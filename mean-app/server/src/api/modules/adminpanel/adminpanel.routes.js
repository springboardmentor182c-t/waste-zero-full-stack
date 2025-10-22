import express from "express";
import * as adminController from "./adminpanel.controller.js";

const router = express.Router();

router.get("/users", adminController.getUsers);
router.post("/logs", adminController.createAdminLog);

export default router;
