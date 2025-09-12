// controllers/homeCategory.controller.js
const OptionalQuestion = require("../../models/OptionalQuestion.model");

// Fetch GenZ_Category options for Home
exports.getHomeCategories = async (req, res, next) => {
  try {
    // Find the document with name "GenZ_Category"
    const genZCategoryDoc = await OptionalQuestion.findOne({ name: "GenZ_Category" });

    if (!genZCategoryDoc) {
      return res.status(404).json({ success: false, message: "GenZ_Category not found" });
    }

    // Return only the options array
    res.status(200).json({ success: true, options: genZCategoryDoc.options });
  } catch (err) {
    next(err);
  }
};
