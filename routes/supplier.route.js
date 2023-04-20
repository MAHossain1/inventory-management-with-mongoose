const express = require("express");
const router = express.Router();
const supplierController = require("../controller/Supplier.controller");

router
  .route("/")
  .get(supplierController.getSuppliers)
  .post(supplierController.createSupplier);

router
  .route("/:id")
  .patch(supplierController.updateSupplierById)
  .get(supplierController.getSupplierById);

module.exports = router;
