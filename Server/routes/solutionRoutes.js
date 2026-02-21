const express = require("express");
const {
  createSolutionController,
  getSolutionsController,
  updateSolutionController,
  deleteSolutionController
} = require("../controllers/solutionController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Admin only
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "super_admin"]),
  createSolutionController
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "super_admin"]),
  updateSolutionController
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "super_admin"]),
  deleteSolutionController
);

// Citizen + Admin
router.get("/", authMiddleware, getSolutionsController);

// public search route (used by legal info page)
const { searchSolutionsController } = require("../controllers/solutionController");
router.get("/search", searchSolutionsController);

module.exports = router;
