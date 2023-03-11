const express = require("express");
const sayingsController = require("../controller/sayings");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

router.post(
  "/",
  // checkAuth.checkAuth,
  sayingsController.save
);
router.get("/:id", sayingsController.show);
router.get("/", sayingsController.index);
router.patch("/:id", sayingsController.update);
router.delete("/:id", sayingsController.destroy);

module.exports = router;
