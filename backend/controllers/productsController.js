import productModel from "../models/productModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await productModel.find({});
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

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    subCategory,
    quantity,
    images,
    discount = 0,
    discountValidTime = Date.now(),
  } = req.body;

  await productModel.create({
    name,
    description,
    price,
    category,
    subCategory,
    quantity,
    images,
    discount,
    discountValidTime,
  });

  res.status(201).json({
    status: "success",
    message: "Product created successfully",
  });
});

// @desc    Update a product
// @route   PATCH /api/products/:slug
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await productModel.findOne({ slug: req.params.slug });
  const updatedFields = req.body;
  const updatedProductDetails = Object.keys(updatedFields);

  console.log(updatedProductDetails);

  if (!product) {
    return res
      .status(404)
      .json({ status: "error", message: "Product not found" });
  }

  res.status(200).json({
    status: "success",
    message: "Product updated successfully",
  });
});
export { getProducts, getProductBySlug, createProduct, updateProduct };
