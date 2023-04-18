const mongoose = require("mongoose");
// const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

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
        values: ["kg", "litre", "pcs", "bag"],
        message: "unit value cant be {VALUE}, must be kg/li/pcs",
      },
    },
    imageURLs: [
      {
        type: String,
        required: true,
        validate: {
          validator: value => {
            if (!Array.isArray(value)) {
              return false;
            }
            let isValid = true;
            value.forEach(url => {
              if (!validator.isURL(url)) {
                isValid = false;
              }
            });
            return isValid;
          },
          message: "Please provide valid image urls",
        },
      },
    ],

    category: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      required: true,
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },

    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity cant be negative"],
      validate: {
        validator: value => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
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
  },
  {
    timestamps: true,
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

// productSchema.post("save", function (doc, next) {
//   console.log("after saving data");
//   next();
// });

productSchema.methods.logger = function () {
  console.log(`Data saved for ${this.name}`);
};

// SCHEMA -> MODE -> QUERY

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
// await Product.create(req.body);
