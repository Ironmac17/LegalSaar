const express = require("express");
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");
const { voiceAskController } = require("../controllers/voiceAskController");

const router = express.Router();
const upload = multer({ dest: "temp/" });

router.post(
    "/ask-voice",
    authMiddleware,
    upload.single("audio"),
    voiceAskController
);

module.exports = router;
