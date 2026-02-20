const express = require("express");
const {
  createKnowledgeController,
  getKnowledgeListController,
  getKnowledgeController,
  updateKnowledgeController,
  deleteKnowledgeController,
  approveKnowledgeController
} = require("../controllers/knowledgeController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Admin-only
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "super_admin"]),
  createKnowledgeController
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "super_admin"]),
  updateKnowledgeController
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "super_admin"]),
  deleteKnowledgeController
);

router.post(
  "/:id/approve",
  authMiddleware,
  roleMiddleware(["admin", "super_admin"]),
  approveKnowledgeController
);

// Public search endpoint
const { searchKnowledgeController } = require("../controllers/knowledgeController");

router.get("/search", searchKnowledgeController);

// Citizen + Admin (read-only)
router.get("/", authMiddleware, getKnowledgeListController);
router.get("/:id", authMiddleware, getKnowledgeController);

module.exports = router;
