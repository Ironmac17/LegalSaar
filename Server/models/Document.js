const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    fileUrl: {
      type: String,
      required: true
    },

    fileType: {
      type: String,
      enum: ["pdf", "image","txt"],
      required: true
    },

    originalName: {
      type: String
    },

    status: {
      type: String,
      enum: ["uploaded", "processed", "failed"],
      default: "uploaded"
    },

    language: {
      type: String,
      default: "en"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);
