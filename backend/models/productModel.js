import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
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
    quantity: {
      type: Number,
      required: true,
      select: false,
      validate: [
        {
          validator: function (value) {
            return value >= 0;
          },
          message: "Quantity cannot be negative",
        },
      ],
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
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

productSchema.pre("save", function (next) {
  this.slug = this.name.toLowerCase().match(/\w+/g).join("-");
  next();
});

productSchema.pre("updateOne", function (next) {
  if (this._update.name) {
    this._update.slug = this._update.name.toLowerCase().match(/\w+/g).join("-");
  }
  next();
});

productSchema.methods.isDiscountValid = function () {
  return this.discountValidTime > Date.now();
};

productSchema.virtual("updatedPrice").get(function () {
  if (this.isDiscountValid()) {
    return this.price - this.discount;
  }

  return this.price;
});

const Product = mongoose.model("Product", productSchema);

export default Product;
