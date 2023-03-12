const multer = require("multer");
const uniqId = require("uniqid");

const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // setting destination of uploading files
    if (file.fieldname === "pdf") {
      // if uploading resume
      cb(null, "./documents");
    } else {
      // else uploading image
      cb(null, "./uploads");
    }
  },
  filename: (req, file, cb) => {
    // naming file
    cb(null, uniqId(file.originalname) );
    // cb(null,uniqId()+path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "pdf") {
    // if uploading resume
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype === "x-pdf" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // check file type to be pdf, doc, or docx
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  } else {
    // else uploading image
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      // check file type to be png, jpeg, or jpg
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: '2mb',
  },
  fileFilter: fileFilter,
})
.fields([
  {
    name: "pdf",
    maxCount: 1,
  },
  {
    name: "image",
    maxCount: 1,
  },
])
;

module.exports = {
  upload: upload,
};
