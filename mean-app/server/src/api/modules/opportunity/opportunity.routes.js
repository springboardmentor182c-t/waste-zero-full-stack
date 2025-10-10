const express = require("express");
const {
  createOpportunity,
  getOpportunities,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity
} = require("./opportunity.controller.js");

const router = express.Router();

router.post("/", createOpportunity);
router.get("/", getOpportunities);
router.get("/:id", getOpportunityById);
router.put("/:id", updateOpportunity);
router.delete("/:id", deleteOpportunity);

module.exports = router;
