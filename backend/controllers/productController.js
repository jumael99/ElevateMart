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
    categoryId,
    subCategoryId,
    image,
  } = req.body;

  const newProduct = await productModel.create({
    name,
    price,
    description,
    quantity,
    discount,
    discountValidTime,
    category: categoryId,
    subCategory: subCategoryId,
    image,
  });

  res.status(201).json({
    status: "success",
    message: "Product created successfully",
    data: newProduct,
  });
});

// @desc    Update a product
// @route   PATCH /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await productModel.findOne({ _id: req.params.id });

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const {
    name,
    discount,
    discountValidTime,
    price,
    quantity,
    description,
    categoryId,
    subCategoryId,
    image,
  } = req.body;

  await productModel.findByIdAndUpdate(
    product._id,
    {
      name,
      discount,
      discountValidTime,
      price,
      quantity,
      description,
      category: categoryId,
      subCategory: subCategoryId,
      image,
    },
    {
      new: true,
      runValidators: false,
    }
  );

  res.status(200).json({
    status: "success",
    message: "Product updated successfully",
  });
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
  if (!deletedProduct) {
    res.status(404);
    throw new Error("Product not found");
  }

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
