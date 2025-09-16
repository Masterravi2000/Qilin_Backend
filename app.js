require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { ApiError } = require("./utils/customErrorHandler"); // optional if using custom errors
const globalErrorHandler = require("./src/controllers/error.controller"); // optional
const optionalQuestionRouter = require("./src/routes/optionalQuestion.route");
const writtenQuestionRouter = require("./src/routes/writtenQuestion.route");
const productRoutes = require('./src/routes/product.route')
const homeRoutes = require('./src/routes/home.routes')
const aiRoute = require('./src/routes/ai.route')

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS setup
const corsOptions = {
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));


//registered route
app.use("/api/v1/optional-questions", optionalQuestionRouter);
app.use("/api/v1/written-questions", writtenQuestionRouter);
app.use("/api/v1/products", productRoutes);
app.use("/api/home-category", homeRoutes);
app.use("/api/ai", aiRoute);


// Health check
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ message: "Backend is running!" });
});


// Handle undefined routes
app.all("*", (req, res, next) => {
  next(new ApiError(404, `Can't find ${req.originalUrl} on this server!`));
});


// Global error handler
app.use(globalErrorHandler);

module.exports = app;
