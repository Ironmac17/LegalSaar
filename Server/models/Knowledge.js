const mongoose = require("mongoose");

const knowledgeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    category: {
      type: String,
      required: true,
      index: true
    },

    explanation: {
      type: String,
      required: true
    },

    steps: [String],

    requiredDocuments: [String],

    applicableStates: [String],

    keywords: {
      type: [String],
      index: true
    },
    source: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Source",
      required: true
    },

    sourceExcerpt: {
      type: String 
    },

    sourceUrl: {
      type: String
    },

    status: {
      type: String,
      enum: ["draft", "approved"],
      default: "draft",
      index: true
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    approvedAt: {
      type: Date
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Knowledge", knowledgeSchema);
