import express from 'express';
import {
  getProducts,
  getProductBySlug,
  createNewProduct,
  updateProduct,
} from '../controllers/productController.js';

const productRouter = express.Router();

// Define routes
productRouter
  .route('/')
  .get(getProducts)
  .post(createNewProduct);

productRouter
  .route('/:slug')
  .get(getProductBySlug)
  .patch(updateProduct);

export default productRouter;
