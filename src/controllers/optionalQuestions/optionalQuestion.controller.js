const OptionalQuestion = require("../../models/OptionalQuestion.model");

// Get all optional questions
exports.getAllOptionalQuestions = async (req, res, next) => {
  try {
    const questions = await OptionalQuestion.find();
    res.status(200).json({ success: true, questions });
  } catch (err) {
    next(err);
  }
};

// Create new optional question(s)
exports.createOptionalQuestions = async (req, res, next) => {
  try {
    // Accept an array for bulk insert
    const questions = await OptionalQuestion.insertMany(req.body);
    res.status(201).json({ success: true, questions });
  } catch (err) {
    next(err);
  }
};
