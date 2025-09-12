const express = require("express");
const { generateProductAttributes } = require("../controllers/ai/ai.controller");

const router = express.Router();
router.post("/cataloger", generateProductAttributes);

module.exports = router;
