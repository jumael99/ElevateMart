import express from "express";
import {
  createOrder,
  getOrderById,
  updatePaymentStatus,
  getMyOrders,
  getOrders,
  updateDeliveryStatus,
} from "../controllers/orderController.js";
import protectMiddleware from "../middleware/protectMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protectMiddleware(), createOrder)
  .get(protectMiddleware("admin"), getOrders);

router.route("/myorders").get(protectMiddleware(), getMyOrders);

router.route("/:id").get(protectMiddleware(), getOrderById);

router.route("/:id/payment").patch(protectMiddleware(), updatePaymentStatus);

router
  .route("/:id/deleiver")
  .patch(protectMiddleware("admin"), updateDeliveryStatus);

export default router
