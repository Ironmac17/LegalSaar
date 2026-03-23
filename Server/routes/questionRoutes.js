const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { askQuestionController } = require("../controllers/questionController");

const router = express.Router();

// Integrated with FAISS + FLAN-T5 via ML bridge
router.post(
  "/ask",
  authMiddleware,
  askQuestionController
);

module.exports = router;
