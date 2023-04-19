const Product = require("../models/Product");
const mockData = require("../data/mock-data.json");
const productData = require("../data/productData.json");
const Brand = require("../models/Brand");

exports.getProductService = async (filters, queries) => {
  const products = await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const total = await Product.countDocuments(filters);
  const page = Math.ceil(total / queries.limit);

  return { total, page, products };
};

exports.createProductService = async data => {
  const product = await Product.create(data);
  const { _id: productId, brand } = product;

  const res = await Brand.updateOne(
    { _id: brand.id },
    { $push: { products: productId } }
  );
  return product;
};

exports.updateProductByIdService = async (productId, data) => {
  const result = await Product.updateOne(
    { _id: productId },
    { $inc: data },
    { runValidators: true }
  );

  // const product = await Product.findById(productId);
  // const result = await product.set(data).save();
  return result;
};

exports.bulkUpdateProductService = async () => {
  // console.log(data.ids, data.data);

  // const result = await Product.updateMany({ _id: data.ids }, data.data, {
  //   runValidators: true,
  // });
  const products = [];

  // mockData.forEach(product => {
  //   products.push(Product.updateOne({ _id: product.id }, product.data));
  // });
  productData.forEach(product => {
    products.push(Product.create(product));
  });

  const result = await Promise.all(products);
  // console.log(result);
  return result;
};

exports.bulkDeleteProductService = async () => {
  const result = await Product.deleteMany({});
  return result;
};

exports.deleteProductByIdService = async id => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};
