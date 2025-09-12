const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    description: { type: String },
    images: { type: [String], default: [] },
    price: { type: String, required: true },
    originalPrice: { type: String },
    selectedValues: { type: Object, default: {} }, // e.g., Category, Size, Condition
    writtenValues: { type: Object, default: {} },  // e.g., Brand, Color
  },
  { timestamps: true } // automatically adds createdAt & updatedAt
);

module.exports = mongoose.model('Product', ProductSchema);
