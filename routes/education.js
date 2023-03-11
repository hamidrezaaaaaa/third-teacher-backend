const express = require("express");
const educationController =require("../controller/education");
const imageUploader = require("../helpers/imageUploader");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

router.post(
  "/",
  // checkAuth.checkAuth,
  imageUploader.upload.single("imageurl"),
  educationController.save
);
router.get("/:id", educationController.show);
router.get("/", educationController.index);
router.patch(
  "/:id",
  imageUploader.upload.single("imageurl"),
  educationController.update
);
router.delete("/:id", educationController.destroy);

module.exports = router;
