const multer = require("multer");
const uniqId = require("uniqid");

const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./documents");
  },
  filename: function (req, file, cb) {
    cb(null, uniqId(file.originalname) );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf" || file.mimetype === "x-pdf") {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});

module.exports = {
  upload: upload,
};
