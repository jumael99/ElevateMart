import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      validate: [
        {
          validator: function (value) {
            return value >= 0;
          },
          message: "Price cannot be negative",
        },
      ],
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    discount: {
      type: Number,
      default: 0,
      validate: [
        {
          validator: function (value) {
            return value >= 0;
          },
          message: "Discount cannot be negative",
        },
        {
          validator: function (value) {
            return value <= this.price;
          },
          message: "Discount cannot be greater than the price",
        },
      ],
    },
    discountValidTime: {
      type: Date,
      default: Date.now,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    subCategory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Slug creation
productSchema.pre("save", function (next) {
  this.slug = this.name.toLowerCase().split(" ").join("-");
  next();
});

// Slug update
productSchema.pre("updateOne", function (next) {
  this._update.slug = this._update.name.toLowerCase().split(" ").join("-");
  next();
});

productSchema.methods.calculateDiscountedPrice = function () {
  return this.price - this.discount;
};

productSchema.methods.isDiscountValid = function () {
  return this.discountValidTime > Date.now();
};

const Product = mongoose.model("Product", productSchema);

export default Product;
