const express = require("express");
const categoryController = require("../controller/category.controller");
const router = express.Router();

router
  .route("/")
  .post(categoryController.createCategory)
  .get(categoryController.getCategories);

// router.route("/:id").get(categoryController.getStoreById);

module.exports = router;
