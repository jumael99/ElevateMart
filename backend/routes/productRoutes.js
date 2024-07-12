import router from "express";
import protect from "../middleware/protectMiddleware.js";

import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
} from "../controllers/productsController.js";

const productRouter = router.Router();

productRouter.route("/").get(getProducts).post(protect("admin"), createProduct);
productRouter
  .route("/:slug")
  .get(getProductBySlug)
  .patch(protect("admin"), updateProduct);

export default productRouter;
