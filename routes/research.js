const express = require("express");
const researchController = require("../controller/research");
const uploader = require("../helpers/uploader");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

router.post(
  "/",
  // checkAuth.checkAuth,
  uploader.upload,
  researchController.save
);

router.get("/:id", researchController.show);
router.get("/", researchController.index);
router.patch(
  "/:id",
  uploader.upload,
  researchController.update
);
router.delete("/:id", researchController.destroy);

module.exports = router;
