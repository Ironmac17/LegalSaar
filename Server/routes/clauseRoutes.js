const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Clause = require("../models/Clause");

const router = express.Router();

router.get(
  "/document/:documentId",
  authMiddleware,
  async (req, res, next) => {
    try {
      const clauses = await Clause.find({
        document: req.params.documentId
      }).populate("linkedKnowledge");

      res.json(clauses);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
