const {
  createStockService,
  getStocksService,
  getStockByIdService,
} = require("../services/stock.service");

exports.createStock = async (req, res) => {
  try {
    const result = await createStockService(req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully created the Stock",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't create the Stock",
    });
  }
};

exports.getStocks = async (req, res, next) => {
  try {
    let filters = { ...req.query };
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach(field => delete filters[field]);

    //gt ,lt ,gte .lte
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      match => `$${match}`
    );

    filters = JSON.parse(filtersString);

    const queries = {};

    if (req.query.sort) {
      // price,qunatity   -> 'price quantity'
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(fields);
    }

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;

      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const stocks = await getStocksService(filters, queries);
    res.status(200).json({
      status: "Success",
      message: "Successfully get the Stocks",
      data: stocks,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error: "Couldn't get the Stocks",
    });
  }
};

exports.getStockById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const stock = await getStockByIdService(id);
    if (!stock) {
      return res.status(400).json({
        status: "Fail",
        error: "Couldn't find the Stock according to your id",
      });
    }
    res.status(200).json({
      status: "Success",
      message: "Successfully get the Stock",
      data: stock,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Failed",
      error: "Couldn't get the Stock",
    });
  }
};
