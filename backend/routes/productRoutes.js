import router from "express";

import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
} from "../controllers/productsController.js";

const productRouter = router.Router();

productRouter.route("/").get(getProducts).post(createProduct);
productRouter.route("/:slug").get(getProductBySlug).patch(updateProduct);

export default productRouter;
