const express = require("express");
const productController = require("../controller/Product.controller");
const router = express.Router();

const uploader = require("../middleware/uploader");
const verifyToken = require("../middleware/verifyToken");
const authorization = require("../middleware/authorization");

router.post(
  "/file-upload",
  uploader.array("image"),
  productController.fileUpload
);

router.route("/bulk-update").patch(productController.bulkUpdateProduct);
router.route("/bulk-delete").delete(productController.bulkDeleteProduct);

router
  .route("/")
  .get(productController.getProducts)
  .post(
    verifyToken,
    authorization("admin", "store-manager"),
    productController.createProduct
  );

router
  .route("/:id")
  .patch(productController.updateProductById)
  .delete(productController.deleteProductById);

module.exports = router;
