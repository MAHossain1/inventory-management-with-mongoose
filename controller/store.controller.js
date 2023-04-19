const {
  createStoreService,
  getStoresService,
  getStoreByIdService,
} = require("../services/store.service");

exports.createStore = async (req, res, next) => {
  try {
    const result = await createStoreService(req.body);
    res.status(200).json({
      status: "Success",
      message: "Successfully created the Store",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error: "Couldn't create the Store",
    });
  }
};

exports.getStores = async (req, res, next) => {
  try {
    const stores = await getStoresService(req.body);
    res.status(200).json({
      status: "Success",
      message: "Successfully get the Stores",
      data: stores,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error: "Couldn't get the stores",
    });
  }
};
exports.getStoreById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const store = await getStoreByIdService(id);
    if (!store) {
      return res.status(400).json({
        status: "Fail",
        error: "Couldn't find the store according to your id",
      });
    }
    res.status(200).json({
      status: "Success",
      message: "Successfully get the store",
      data: store,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error: "Couldn't get the store",
    });
  }
};
