const Product = require('../../models/Product.model'); // import your Product model
const { uploadImageToCloudinary } = require('../../config/cloudinary'); // your Cloudinary helper

const createProduct = async (req, res, next) => {
  try {
    const { productName, price, originalPrice, description, ...otherFields } = req.body;

    // Upload images to Cloudinary
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file => uploadImageToCloudinary(file.buffer));
      imageUrls = await Promise.all(uploadPromises);
    }

    // Create new product document
    const newProduct = new Product({
      productName,
      price,
      originalPrice,
      description,
      images: imageUrls,
      ...otherFields,
      createdAt: new Date(),
    });

    // Save product to database
    await newProduct.save();

    res.status(201).json({
      success: true,
      product: newProduct,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    next(error); // pass error to global handler
  }
};

module.exports = { createProduct };
