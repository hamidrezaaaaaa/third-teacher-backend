const express = require("express");
const membersController =require("../controller/members");
const imageUploader = require("../helpers/imageUploader");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

router.post(
  "/",
  // checkAuth.checkAuth,
  imageUploader.upload.single("imageurl"),
  membersController.save
);
router.get("/:id", membersController.show);
router.get("/", membersController.index);
router.patch(
  "/:id",
  imageUploader.upload.single("imageurl"),
  membersController.update
);
router.delete("/:id", membersController.destroy);

module.exports = router;
