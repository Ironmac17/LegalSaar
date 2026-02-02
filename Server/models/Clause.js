const mongoose = require("mongoose");

const clauseSchema = new mongoose.Schema(
  {
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
      index: true
    },

    clauseNumber: {
      type: String
    },

    text: {
      type: String,
      required: true
    },

    pageNumber: {
      type: Number
    },

    confidence: {
      type: Number,
      default: 1.0
    },
    linkedKnowledge: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Knowledge"
      }
    ],
    matchedKeywords: [
      {
        type: String
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Clause", clauseSchema);
