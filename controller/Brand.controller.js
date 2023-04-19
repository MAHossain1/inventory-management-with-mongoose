const { createBrandService } = require("../services/brand.service");

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
