
const { uploadImageToCloudinary } = require("../../config/cloudinary");

// Upload handler
const uploadImagesForAI = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No images provided" });
    }

    const uploadedUrls = await Promise.all(
      req.files.map(file => uploadImageToCloudinary(file.buffer))
    );

    res.status(200).json({ urls: uploadedUrls });
  } catch (err) {
    console.error("AI temp upload error:", err);
    res.status(500).json({ error: "Image upload failed" });
  }
};

module.exports = { uploadImagesForAI };
