const OpenAI = require("openai");
const WrittenQuestion = require("../../models/WrittenQuestion.model");
const OptionalQuestion = require("../../models/OptionalQuestion.model");

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const generateProductAttributes = async (req, res) => {
  try {
    const { image_urls } = req.body;

    if (!image_urls || !image_urls.length) {
      return res.status(400).json({ error: "No images provided" });
    }

    // Fetch written and optional questions from DB
    const writtenQuestions = await WrittenQuestion.find();
    const optionalQuestions = await OptionalQuestion.find();

    // Prepare the lists dynamically
    const subCategory = optionalQuestions.find(q => q.name === "Sub_Category")?.options || [];
    const genZCategory = optionalQuestions.find(q => q.name === "GenZ_Category")?.options || [];
    const condition = optionalQuestions.find(q => q.name === "Condition")?.options || [];
    const category = optionalQuestions.find(q => q.name === "Category")?.options || [];

const prompt = `
You are an AI assistant for a preloved fashion marketplace catering to Gen Z women in India.

Analyze these product images: ${image_urls.join(", ")}.

Fill the product listing form exactly with these fields in JSON format. Follow these rules strictly:

Written fields (plain strings or numbers):
- "Color": provide primary and secondary colors as a single comma-separated string (e.g., "Red, Blue"). If unsure, leave it empty.
- "Material": suggest the material as a single word or phrase (e.g., "Cotton", "Silk"). If unsure, leave it empty.
- "Weight": leave it empty.
- "Brand": leave it empty.
- "HSN": leave it empty.

Optional fields (choose only one from the provided list or leave blank if unsure):
- "Size": leave blank.
- "Sub_Category": choose one from ["Tshirts","Tops","Shirts","Dresses","Blouses","Jeans","Skirts & Shorts","Trousers","Kurtis & Kurtas","Sarees","Lehengas","Suit Sets","Jackets","Blazers","Loungewear & Co-ords","Activewear & Sportswear","Maternity & Nursing","Heels & Boots","Flats & Sandals","Casual & Streetwear","Sweaters","Coats","Accessories"].
- "GenZ_Category": choose one from ["Streetwear","Y2K & 2000s","Coquette","Alt & Edgy","Old Money/Preppy","Mermaidcore","Grunge/Goth","Cottagecore","Indie","Clean girl","Baddie","Ethnic/Traditional"].
- "Condition": choose one from ["New with Tag","New without Tag","Very Good","Good","Fair"].
- "Category": choose one from ["Women","Men","Kids","Accessories"].

Additional fields:
- "Product Name": suggest a catchy name as a string based on the image.
- "Short Description": suggest a short description as a string highlighting the key features.

Important rules:
- Return ONLY the JSON object.
- Each field must be of the correct type: strings must be strings, integers must be integers.
- Do not return arrays; if multiple values are needed (like Color), return them as a single string separated by commas.
- Do not add any explanation, comments, or code blocks.
- If unsure, leave the field blank.

Example format:
{
  "Color": "Red, White",
  "Material": "Cotton",
  "Weight": "",
  "Brand": "",
  "HSN": "",
  "Size": "",
  "Sub_Category": "Tops",
  "GenZ_Category": "Streetwear",
  "Condition": "New with Tag",
  "Category": "Women",
  "Product Name": "Stylish Red Cotton Top",
  "Short Description": "A vibrant red cotton top perfect for casual outings."
}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    let rawText = response.choices[0].message.content;

    rawText = rawText.replace(/```json|```/g, "").trim();

    let attributes;
    try {
      attributes = JSON.parse(rawText);
    } catch (err) {
      console.error("Error parsing AI response:", err);
      attributes = null;
    }

    res.status(200).json({ attributes });
  } catch (err) {
    console.error("OpenAI AI Error:", err);
    res.status(500).json({ error: "AI processing failed" });
  }
};

module.exports = { generateProductAttributes };
