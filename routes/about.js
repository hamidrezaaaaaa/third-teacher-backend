const express = require("express");
const aboutController = require("../controller/about");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

router.post(
  "/",
  // checkAuth.checkAuth,
  aboutController.save
);
router.get("/:id", aboutController.show);
router.get("/", aboutController.index);
router.patch("/:id", aboutController.update);
router.delete("/:id", aboutController.destroy);

module.exports = router;
