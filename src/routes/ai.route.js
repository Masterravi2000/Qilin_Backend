const express = require("express");
const multer = require("multer");  
const upload = multer(); 
const { generateProductAttributes } = require("../controllers/ai/ai.controller");
const { uploadImagesForAI } = require("../controllers/ai/ImgUploadForAi.controller");

const router = express.Router();
router.post("/cataloger", generateProductAttributes);
router.post("/ai-upload", upload.array("images"), uploadImagesForAI);

module.exports = router;
