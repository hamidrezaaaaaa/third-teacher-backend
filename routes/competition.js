const express = require("express");
const competitionController = require("../controller/competition");
const uploader = require("../helpers/uploader");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

router.post(
  "/",
  // checkAuth.checkAuth,
  uploader.upload,
  competitionController.save
);

router.get("/:id", competitionController.show);
router.get("/", competitionController.index);
router.patch(
  "/:id",
  uploader.upload,
  competitionController.update
);
router.delete("/:id", competitionController.destroy);

module.exports = router;
