import express from "express";
import { dashboard } from "./dashboard.controller.js";

const router = express.Router();

router.get("/dashboard", dashboard);

export default router;
