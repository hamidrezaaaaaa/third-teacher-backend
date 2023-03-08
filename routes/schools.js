const express = require("express");
const schoolsController =require("../controller/schools");
const imageUploader = require("../helpers/imageUploader");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

router.post(
  "/",
  // checkAuth.checkAuth,
  imageUploader.upload.single("imageurl"),
  schoolsController.save
);
router.get("/:id", schoolsController.show);
router.get("/", schoolsController.index);
router.patch(
  "/:id",
  imageUploader.upload.single("imageurl"),
  schoolsController.update
);
router.delete("/:id", schoolsController.destroy);

module.exports = router;
