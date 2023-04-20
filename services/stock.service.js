const Stock = require("../models/Stock");

exports.createStockService = async data => {
  const result = await Stock.create(data);
  return result;
};

exports.getStocksService = async (filters, queries) => {
  const stocks = await Stock.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const total = await Stock.countDocuments(filters);
  const page = Math.ceil(total / queries.limit);

  return { total, count: stocks.length, page, stocks };
};

exports.getStockByIdService = async stockId => {
  const result = await Stock.findOne({ _id: stockId })
    .populate("store.id")
    .populate("brand.id")
    .populate("suppliedBy.id");
  return result;
};
