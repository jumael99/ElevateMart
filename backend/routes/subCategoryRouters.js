import express from 'express';
import protect from '../middleware/protectMiddleware.js'
import {
  getSubCategory,
  createNewSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from '../controllers/subCategoryController.js';

const router = express.Router();

router.route('/')
  .get(getSubCategory)
  .post(protect("admin"), createNewSubCategory);

router.route('/:id')
  .patch(protect("admin"), updateSubCategory)
  .delete(protect("admin"), deleteSubCategory);

export default router;
