import express from "express";
import protectMiddlewere from "../middleware/protectMiddleware.js";
import {
  getProducts,
  getProductBySlug,
  createNewProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

// Define routes
productRouter
  .route("/")
  .get(getProducts)
  .post(protectMiddlewere("admin"), createNewProduct);

productRouter.route("/:slug").get(getProductBySlug);

productRouter
  .route("/:id")
  .delete(protectMiddlewere("admin"), deleteProduct)
  .patch(protectMiddlewere("admin"), updateProduct);

export default productRouter;
