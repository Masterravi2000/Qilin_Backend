const express = require("express");
const router = express.Router();
const { getHomeCategories } = require("../controllers/homePage/homeCategory.controller");

// GET /api/home-category
router.get("/", getHomeCategories);

module.exports = router;
