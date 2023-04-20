const Supplier = require("../models/Supplier");

exports.createSupplierService = async data => {
  const result = await Supplier.create(data);
  return result;
};

exports.getSuppliersService = async () => {
  const result = await Supplier.find({});
  return result;
};

exports.updateSupplierByIdService = async (supplierId, data) => {
  const result = await Supplier.updateOne(
    { _id: supplierId },
    { $inc: data },
    { runValidators: true }
  );
  return result;
};

exports.getSupplierByIdService = async supplierId => {
  const result = await Supplier.findOne({ _id: supplierId });
  return result;
};
