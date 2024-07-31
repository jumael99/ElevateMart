import orderModel from "../models/orderModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { products, totalAmount } = req.body;

  const shippingAddress = req.user.address;

  const newOrder = await orderModel.create({
    orderBy: req.user._id,
    orderItems: products,
    shippingAddress,
    totalAmount,
  });

  res.status(201).json({
    success: true,
    order: newOrder,
  });
});

// @desc    Update Payment Status
// @route   PUT /api/orders/:id/payment
// @access  Public
const updatePaymentStatus = asyncHandler(async (req, res) => {
  const order = await orderModel.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  const { id, status, updateTime, paymentMethod, currency, conversionRate } =
    req.body;

  const paymentResult = {
    transactionID: id,
    status,
    updateTime,
    currency,
    conversionRate,
  };
  order.paymentResult = paymentResult;
  order.deliveryStatus = "Processing";
  order.paymentMethod = paymentMethod;
  await order.save();
  res.status(204).json();
});

// @desc    Get Order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await orderModel
    .findById(req.params.id)
    .populate({
      path: "orderBy",
      select: "name email",
    })
    .populate({
      path: "orderItems.product",
      select: "name image",
    });
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  res.status(200).json({
    success: true,
    order,
  });
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myOrders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await orderModel.find({ orderBy: req.user._id }).populate({
    path: "orderItems.product",
    select: "name image",
  });
  res.status(200).json({
    success: true,
    orders,
  });
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await orderModel
    .find({})
    .populate({
      path: "orderBy",
      select: "name email",
    })
    .populate({
      path: "orderItems.product",
      select: "name image",
    });
  res.status(200).json({
    success: true,
    orders,
  });
});

// @desc    Update Delivery Status
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateDeliveryStatus = asyncHandler(async (req, res) => {
  const order = await orderModel.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  order.deliveryStatus = req.body.status;
  await order.save();
  res.status(204).json();
});

export {
  createOrder,
  updatePaymentStatus,
  getOrderById,
  getMyOrders,
  getOrders,
  updateDeliveryStatus,
};
