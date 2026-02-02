const moongose=require('mongoose')

const mongoose = require("mongoose");

const officeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    department: {
      type: String,
      required: true
    },

    purpose: {
      type: String,
      required: true
    },

    address: {
      type: String,
      required: true
    },

    city: {
      type: String,
      required: true,
      index: true
    },

    state: {
      type: String,
      required: true
    },

    contactNumber: {
      type: String
    },

    workingHours: {
      type: String
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Office", officeSchema);
