import productModel from "../models/productModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Fetch all products or filter by category
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const { category } = req.query;
  let filter = {};

  if (category) {
    filter.category = category;
  }

  const products = await productModel
    .find(filter)
    .populate({
      path: "category",
      select: "name",
    })
    .populate({
      path: "subCategory",
      select: "name",
    });
  res.status(200).json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:slug
// @access  Public
const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await productModel.findOne({ slug: req.params.slug });
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json(product);
});

const createNewProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    quantity,
    discount,
    discountValidTime,
    category,
    subCategory,
    image,
  } = req.body;

  console.log("Received product data:", req.body);

  const newProduct = productModel.create({
    name,
    price,
    description,
    image,
    quantity,
    discount,
    discountValidTime,
    category,
    subCategory,
  });

  res.status(201).json(newProduct);
});

// @desc    Update a product
// @route   PATCH /api/products/:slug
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await productModel.findOne({ slug: req.params.slug });

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const allowedUpdates = [
    "name",
    "description",
    "price",
    "category",
    "subCategory",
    "quantity",
    "images",
    "discount",
    "discountValidTime",
  ];

  const updatedProduct = allowedUpdates.reduce((acc, update) => {
    if (req.body[update]) {
      acc[update] = req.body[update];
    }
    return acc;
  }, {});

  if (!Object.keys(updatedProduct).length) {
    res.status(400);
    throw new Error("No updates provided");
  }

  if (updatedProduct.discount || updatedProduct.price) {
    const price = updatedProduct.price || product.price;
    const discount = updatedProduct.discount || product.discount;
    if (discount > price) {
      res.status(400);
      throw new Error("Discount cannot be greater than price");
    }
  }

  await productModel.findByIdAndUpdate(product._id, updatedProduct);

  res.status(200).json({
    status: "success",
    message: "Product updated successfully",
  });
});

// @desc    Delete a product
// @route   DELETE /api/products/:slug
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await productModel.findOne({ slug: req.params.slug });

  if (!product) {
    return res
      .status(404)
      .json({ status: "error", message: "Product not found" });
  }

  await productModel.findByIdAndDelete(product._id);

  res.status(200).json({
    status: "success",
    message: "Product deleted successfully",
  });
});

export {
  getProducts,
  getProductBySlug,
  createNewProduct,
  updateProduct,
  deleteProduct,
};
