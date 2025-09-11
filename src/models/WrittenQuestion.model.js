const mongoose = require("mongoose");

const writtenQuestionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    keyboardType: {
      type: String,
      enum: ["default", "numeric", "email-address", "phone-pad"],
      default: "default",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WrittenQuestion", writtenQuestionSchema);
