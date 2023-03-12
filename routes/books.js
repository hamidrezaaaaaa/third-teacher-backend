const express = require("express");
const booksController = require("../controller/books");
const uploader = require("../helpers/uploader");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

router.post(
  "/",
  // checkAuth.checkAuth,
  uploader.upload,
  booksController.save
);

router.get("/:id", booksController.show);
router.get("/", booksController.index);
router.patch(
  "/:id",
  uploader.upload,
  booksController.update
);
router.delete("/:id", booksController.destroy);

module.exports = router;
