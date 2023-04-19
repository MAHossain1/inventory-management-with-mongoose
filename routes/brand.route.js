const express = require("express");
const brandController = require("../controller/Brand.controller");

const router = express.Router();

router.post("/", brandController.createBrand);

module.exports = router;
