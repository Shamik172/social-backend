const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const uploadRoutes = require("./routes/uploadRoutes");
const uploadAIRoutes = require("./routes/uploadAIRoutes");

const app = express();

// CORS — directly allow your Render frontend URL
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://social-frontend-nbqz.onrender.com" // ← YOUR FRONTEND URL
    ],
    credentials: true,
  })
);

app.use(express.json());

// Serve uploaded images/PDFs
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/upload-ai", uploadAIRoutes);


// Port (Render provides PORT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
