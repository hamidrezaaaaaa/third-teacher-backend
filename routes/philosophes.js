const express = require("express");
const philosophesController = require("../controller/philosophes");
const imageUploader = require("../helpers/imageUploader");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

router.post(
  "/",
  // checkAuth.checkAuth,
  imageUploader.upload.single("imageurl"),
  philosophesController.save
);
router.get("/:id", philosophesController.show);
router.get("/", philosophesController.index);
router.patch(
  "/:id",
  imageUploader.upload.single("imageurl"),
  philosophesController.update
);
router.delete("/:id", philosophesController.destroy);

module.exports = router;
