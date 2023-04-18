const { query } = require("express");
const Product = require("../models/Product");
const {
  getProductService,
  createProductService,
  bulkUpdateProductService,
  updateProductByIdService,
  deleteProductByIdService,
  bulkDeleteProductService,
} = require("../services/product.services");

exports.getProducts = async (req, res) => {
  try {
    // const product = await Product.findById("6434cc28af8a8830b414c575");

    // { price: { $gt: 50 } }
    // { price: { gt: '12' } }
    // { price: { '$gt': '12' } }
    // console.log(req.query);

    let filters = { ...req.query };

    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach(field => delete filters[field]);

    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      match => `$${match}`
    );
    filters = JSON.parse(filtersString);

    const queries = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      console.log(fields);
      queries.fields = fields;
    }

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const products = await getProductService(filters, queries);
    //   .equals(/\w/)
    // .equals(/^[A-Za-z\s-]+$/)

    //   .where("price")
    //   .gt(100);
    //   .limit(1);
    // find(
    // {
    // Query
    // name: { $in: ["Chal", "dal", "Panjabi"] },
    // quantity: { $lte: 200 },
    // status: { $ne: "out-of-stock" },
    // $or: [{ _id: "6434c8e0ab0e37193459be1d" }, { name: "hisibiji" }],
    // }
    // Projection
    // "name quantity"
    // "-price -unit -name"
    // );
    // .select({ name: 1, _id: 0 });
    // sort({ quantity: -1 });
    // .skip(3)
    // .limit(2);

    res.status(200).json({
      status: "Success",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Cant get data",
      error: error.message,
    });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const result = await createProductService(req.body);
    result.logger();

    // instance create->do something-> save ()

    // const product = new Product(req.body);
    // if (product.quantity === 0) {
    //   product.status = "out-of-stock";
    // }
    // const result = await product.save();

    res.status(200).json({
      status: "success",
      message: "Data inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "data inserted failed",
      error: error.message,
    });
  }
};

exports.updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateProductByIdService(id, req.body);
    res.status(200).json({
      status: "Success",
      message: "Successfully updated the Product",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't Update the Product",
      error: error.message,
    });
  }
};

exports.bulkUpdateProduct = async (req, res) => {
  try {
    // const result = await bulkUpdateProductService(req.body);
    const result = await bulkUpdateProductService();
    res.status(200).json({
      status: "Success",
      message: "Successfully updated the Product",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't Update the Product",
      error: error.message,
    });
  }
};
exports.bulkDeleteProduct = async (req, res) => {
  try {
    const result = await bulkDeleteProductService(req.body.ids);
    res.status(200).json({
      status: "Success",
      message: "Successfully Deleted the given Products",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't Deleted the given Products",
      error: error.message,
    });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteProductByIdService(id);
    // console.log(result);
    if (!result.deletedCount) {
      return res.status(400).json({
        status: "fail",
        message: "Couldn't delete the Product",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Successfully deleted the Product",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't delete the Product",
      error: error.message,
    });
  }
};
