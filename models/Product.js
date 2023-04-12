const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please Provide a name of this product"],
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 character"],
      maxLength: [100, "Name is too large"],
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
      min: [0, "Price can be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs"],
        message: "unit value cant be {VALUE}, must be kg/li/pcs",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity cant be negative"],
      validate: value => {
        const isInteger = Number.isInteger(value);
        if (isInteger) {
          return true;
        } else {
          return false;
        }
      },
      message: "Quantity must be an integer",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "Status cant be {VALUE}",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier",
    // },
    // categories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
  },
  {
    timeStamps: true,
  }
);

//mongoose middleware for saving data: pre / post

productSchema.pre("save", function (next) {
  console.log("before saving data");
  if (this.quantity === 0) {
    this.status = "out-of-stock";
  }
  next();
});

productSchema.post("save", function (doc, next) {
  console.log("after saving data");
  next();
});

productSchema.methods.logger = function () {
  console.log(`Data saved for ${this.name}`);
};

// SCHEMA -> MODE -> QUERY

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
