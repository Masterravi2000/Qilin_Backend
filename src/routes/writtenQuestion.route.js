const express = require("express");
const router = express.Router();

const {
  getAllWrittenQuestions,
  createWrittenQuestions,
} = require("../controllers/writtenQuestions/writtenQuestions.controller");

// Get all written questions
router.get("/", getAllWrittenQuestions);

// Create new written questions
router.post("/", createWrittenQuestions);

module.exports = router;
