const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { voiceAskController } = require("../controllers/voiceAskController");

const router = express.Router();

// TODO: Rewrite using FAISS retrieval + FLAN-T5 inference
// Changed to POST with JSON body instead of file upload
router.post(
    "/ask-voice",
    authMiddleware,
    voiceAskController
);

module.exports = router;
