const express = require("express");
const philosophesController = require("../controller/philosophes");
const imageUploader = require("../helpers/imageUploader");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

router.post(
  "/",
  checkAuth.checkAuth,
  imageUploader.upload.single("imageUrl"),
  philosophesController.save
);
router.get("/:id", philosophesController.show);
router.get("/", philosophesController.index);
router.patch("/:id", checkAuth.checkAuth, philosophesController.update);
router.delete("/:id", checkAuth.checkAuth, philosophesController.destroy);

module.exports = router;
