import express from "express";
import {
  getProducts,
  getProductBySlug,
  createNewProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

// Define routes
productRouter.route("/").get(getProducts).post(createNewProduct);

productRouter.route("/:slug").get(getProductBySlug).patch(updateProduct);

productRouter.route("/:id").delete(deleteProduct);

export default productRouter;
