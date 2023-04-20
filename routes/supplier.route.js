const express = require("express");
const router = express.Router();
const supplierController = require("../controller/Supplier.controller");

router
  .route("/")
  .post(supplierController.createSupplier)
  .get(supplierController.getSuppliers);

router
  .route("/:id")
  .patch(supplierController.updateSupplierById)
  .get(supplierController.getSupplierById);

module.exports = router;
