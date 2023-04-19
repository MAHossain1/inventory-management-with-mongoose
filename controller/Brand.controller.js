const {
  createBrandService,
  getBrandsService,
  getBrandByIdService,
  updateBrandService,
} = require("../services/brand.service");

exports.createBrand = async (req, res, next) => {
  try {
    const result = await createBrandService(req.body);
    res.status(200).json({
      status: "Success",
      message: "Successfully created the brand",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error: "Couldn't create the brand",
    });
  }
};

exports.getBrands = async (req, res, next) => {
  try {
    const brands = await getBrandsService(req.body);
    res.status(200).json({
      status: "Success",
      message: "Successfully get the brands",
      data: brands,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error: "Couldn't get the brands",
    });
  }
};

exports.getBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await getBrandByIdService(id);
    if (!brand) {
      return res.status(400).json({
        status: "Fail",
        error: "Couldn't find the brand according to your id",
      });
    }
    res.status(200).json({
      status: "Success",
      message: "Successfully get the brand",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error: "Couldn't get the brand",
    });
  }
};
exports.updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateBrandService(id, req.body);
    if (!result.nModified) {
      return res.status(400).json({
        status: "Fail",
        error: "Couldn't update the brand according to your id",
      });
    }
    res.status(200).json({
      status: "Success",
      message: "Successfully updated the brand",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error: "Couldn't update the brand",
    });
  }
};
