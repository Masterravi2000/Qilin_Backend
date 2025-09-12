const { HfInference } = require("@huggingface/inference");
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

const generateProductAttributes = async (req, res) => {
  try {
    const { image_urls } = req.body;

    if (!image_urls || !image_urls.length) {
      return res.status(400).json({ error: "No images provided" });
    }

    let captions = [];
    for (const url of image_urls) {
      try {
        console.log("Processing image URL:", url);
        const caption = await hf.imageToText({
          model: "Salesforce/blip2-flan-t5-xl",
          inputs: url
        });
        console.log("Caption:", caption);
        captions.push(caption);
      } catch (err) {
        console.error("Error with image:", url, err.response?.data || err.message || err);
        captions.push(null);
      }
    }

    const combinedCaption = captions.join(" | ");
    res.json({ captions, combined_caption: combinedCaption });
  } catch (err) {
    console.error("BLIP-2 AI Error:", err);
    res.status(500).json({ error: "AI processing failed" });
  }
};

module.exports = { generateProductAttributes };
