const mongoose = require("mongoose");

const solutionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    // Which legal knowledge this solution is for
    knowledge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Knowledge",
      required: true,
      index: true
    },

    // Offices involved
    offices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Office"
      }
    ],

    steps: [
      {
        type: String
      }
    ],

    requiredDocuments: [
      {
        type: String
      }
    ],

    eligibility: {
      type: String
    },

    estimatedTime: {
      type: String
    },

    estimatedCost: {
      type: String
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Solution", solutionSchema);
