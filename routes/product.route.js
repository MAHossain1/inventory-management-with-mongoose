const express = require("express");
const productController = require("../controller/Product.controller");
const router = express.Router();

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);

module.exports = router;
