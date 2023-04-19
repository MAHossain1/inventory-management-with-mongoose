const Brand = require("../models/Brand");

exports.createBrandService = async data => {
  const result = await Brand.create(data);
  return result;
};

exports.getBrandsService = async () => {
  const result = await Brand.find({}).select("-products -suppliers");
  return result;
};

exports.getBrandByIdService = async brandId => {
  const result = await Brand.find({ _id: brandId });
  return result;
};
exports.updateBrandService = async (brandId, data) => {
  const result = await Brand.updateOne({ _id: brandId }, data, {
    runValidators: true,
  });
  return result;
};
