const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    marks: {
      type: Number,
      required: true,
    },

    totalMarks: {
      type: Number,
      default: 100,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Marks", marksSchema);