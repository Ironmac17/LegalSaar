const express = require("express");
const multer = require("multer");
const { voiceAskController } = require("../controllers/voiceAskController");

const router = express.Router();
const upload = multer({ dest: "temp/" });

router.post("/ask-voice", upload.single("audio"), voiceAskController);

module.exports = router;
