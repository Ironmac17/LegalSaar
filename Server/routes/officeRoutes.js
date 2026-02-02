const express = require("express");
const {
  createOfficeController,
  getOfficesController,
  getOfficeController,
  updateOfficeController,
  deleteOfficeController
} = require("../controllers/officeController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Admin routes
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "super_admin"]),
  createOfficeController
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "super_admin"]),
  updateOfficeController
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "super_admin"]),
  deleteOfficeController
);

// Shared (admin + citizen later)
router.get("/", authMiddleware, getOfficesController);
router.get("/:id", authMiddleware, getOfficeController);

module.exports = router;
