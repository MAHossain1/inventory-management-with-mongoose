const Product = require("../models/Product");
const {
  getProductService,
  createProductService,
} = require("../services/product.services");

exports.getProducts = async (req, res) => {
  try {
    // const product = await Product.findById("6434cc28af8a8830b414c575");

    const products = await getProductService();
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
