// middleware/upload.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads folder exists (fixes Render ENOENT)
const uploadsPath = path.resolve(process.cwd(), "uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
  console.log("Uploads folder created:", uploadsPath);
}

// Multer disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsPath);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "file-" + unique + path.extname(file.originalname));
  }
});

// Allowed file types
const fileFilter = (req, file, cb) => {
  const allowed = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/jpg"
  ];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type. Only PDF and images allowed."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
