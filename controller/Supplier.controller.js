const {
  createSupplierService,
  getSuppliersService,
  updateSupplierByIdService,
  getSupplierByIdService,
} = require("../services/supplier.service");

exports.createSupplier = async (req, res, next) => {
  try {
    const result = await createSupplierService(req.body);
    res.status(200).json({
      status: "Success",
      message: "Successfully created the Supplier",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error: "Couldn't create the Supplier",
    });
  }
};

exports.getSuppliers = async (req, res, next) => {
  try {
    const Suppliers = await getSuppliersService(req.body);
    res.status(200).json({
      status: "Success",
      message: "Successfully get the Suppliers",
      data: Suppliers,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error: "Couldn't get the Suppliers",
    });
  }
};

exports.updateSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateSupplierByIdService(id, req.body);
    res.status(200).json({
      status: "Success",
      message: "Successfully updated the Supplier",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't Update the Supplier",
      error: error.message,
    });
  }
};

exports.getSupplierById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const store = await getSupplierByIdService(id);
    if (!supplier) {
      return res.status(400).json({
        status: "Fail",
        error: "Couldn't find the supplier according to your id",
      });
    }
    res.status(200).json({
      status: "Success",
      message: "Successfully get the supplier",
      data: store,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error: "Couldn't get the supplier",
    });
  }
};
