const {
  createCategoryService,
  getCategoriesService,
} = require("../services/category.service");

exports.createCategory = async (req, res, next) => {
  try {
    const result = await createCategoryService(req.body);
    res.status(200).json({
      status: "Success",
      message: "Successfully created the Category",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error: "Couldn't create the Category",
    });
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const Categories = await getCategoriesService(req.body);
    res.status(200).json({
      status: "Success",
      message: "Successfully get the Categories",
      data: Categories,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error: "Couldn't get the Categories",
    });
  }
};
