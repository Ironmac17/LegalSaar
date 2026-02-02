const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const { uploadDocumentController } = require("../controllers/documentController");

const router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  uploadDocumentController
);

module.exports = router;
