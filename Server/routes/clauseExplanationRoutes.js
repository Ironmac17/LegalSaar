const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { explainClauseController } = require("../controllers/clauseExplanationController");

const router = express.Router();

// TODO: Rewrite using FAISS retrieval + FLAN-T5 inference
router.get(
  "/:clauseId/explain",
  authMiddleware,
  explainClauseController
);

module.exports = router;
