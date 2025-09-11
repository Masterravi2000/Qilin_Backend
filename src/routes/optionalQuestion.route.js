const express = require("express");
const router = express.Router();

const {
  getAllOptionalQuestions,
  createOptionalQuestions
} = require("../controllers/optionalQuestions/optionalQuestion.controller");

// Get all optional questions
router.get("/", getAllOptionalQuestions);

// Create optional question(s)
router.post("/", createOptionalQuestions);

module.exports = router;
