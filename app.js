const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

// routes
const productRoute = require("./routes/product.route.js");
const brandRoute = require("./routes/brand.route.js");
const storeRoute = require("./routes/store.route.js");
const categoryRoute = require("./routes/category.route.js");
const supplierRoute = require("./routes/supplier.route.js");
const stockRoute = require("./routes/stock.route.js");
const userRoute = require("./routes/user.route.js");

// schema design

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

// POSTING TO DATABASE

app.use("/api/v1/product", productRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/store", storeRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/supplier", supplierRoute);
app.use("/api/v1/stock", stockRoute);
app.use("/api/v1/user", userRoute);

module.exports = app;
