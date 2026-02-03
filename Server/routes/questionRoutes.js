const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { askQuestionController } = require("../controllers/questionController");

const router = express.Router();

router.post(
  "/ask",
  authMiddleware,
  askQuestionController
);

module.exports = router;
