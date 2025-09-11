const express = require("express");
const cors = require("cors");
const { ApiError } = require("./utils/customErrorHandler"); // optional if using custom errors
const globalErrorHandler = require("./src/controllers/error.controller"); // optional
const optionalQuestionRouter = require("./src/routes/optionalQuestion.route");
const writtenQuestionRouter = require("./src/routes/writtenQuestion.route");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//registered route
app.use("/api/v1/optional-questions", optionalQuestionRouter);
app.use("/api/v1/written-questions", writtenQuestionRouter);

// CORS setup
const corsOptions = {
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

// Health check
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ message: "Backend is running!" });
});

// Mount routes
// app.use("/api/v1/products", productRouter);

// Handle undefined routes
app.all("*", (req, res, next) => {
  next(new ApiError(404, `Can't find ${req.originalUrl} on this server!`));
});


// Global error handler
app.use(globalErrorHandler);

module.exports = app;
