const mongoose = require("mongoose");

const optionalQuestionSchema = new mongoose.Schema({
  name: { type: String, required: true },        // e.g., "Category"
  options: [{ type: String }],                   // e.g., ["Clothing", "Shoes"]
  required: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("OptionalQuestion", optionalQuestionSchema);
