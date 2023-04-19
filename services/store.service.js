const Store = require("../models/Store");

exports.createStoreService = async data => {
  const result = await Store.create(data);
  return result;
};
exports.getStoresService = async () => {
  const result = await Store.find({}).select("-products -suppliers");
  return result;
};

exports.getStoreByIdService = async storeId => {
  const result = await Store.find({ _id: storeId });
  return result;
};
