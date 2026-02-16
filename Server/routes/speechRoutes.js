const express = require("express");
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");
const { transcribeAudioController } = require("../controllers/speechController");

const router = express.Router();
const upload = multer({ dest: "temp/" });

router.post(
    "/transcribe",
    authMiddleware,
    upload.single("audio"),
    transcribeAudioController
);

module.exports = router;
