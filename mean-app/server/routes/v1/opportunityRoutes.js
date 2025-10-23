const express = require("express");
const router = express.Router();
const {
  createOpportunity,
  getAllOpportunities,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity,
} = require("../../controllers/opportunityController");

router.post("/", createOpportunity);
router.get("/", getAllOpportunities);
router.get("/:id", getOpportunityById);
router.put("/:id", updateOpportunity);
router.delete("/:id", deleteOpportunity);

module.exports = router;
