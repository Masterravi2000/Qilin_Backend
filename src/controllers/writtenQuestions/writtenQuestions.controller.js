const WrittenQuestion = require("../../models/WrittenQuestion.model");

// Get all written questions
exports.getAllWrittenQuestions = async (req, res, next) => {
  try {
    const questions = await WrittenQuestion.find();
    res.status(200).json({ success: true, questions });
  } catch (err) {
    next(err);
  }
};

// Create new written questions (bulk insert)
exports.createWrittenQuestions = async (req, res, next) => {
  try {
    const questions = await WrittenQuestion.insertMany(req.body);
    res.status(201).json({ success: true, questions });
  } catch (err) {
    next(err);
  }
};
