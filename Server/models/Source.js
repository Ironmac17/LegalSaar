const mongoose = require("mongoose");

const sourceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["pdf", "html", "api"],
      required: true
    },

    title: String,

    url: {
      type: String,
      required: true
    },

    department: String,
    state: String,

    fetchedAt: {
      type: Date,
      default: Date.now
    },

    verified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Source", sourceSchema);
