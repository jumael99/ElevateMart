import express from "express";
const router = express.Router();

import {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} from '../controllers/categoryController.js';

// import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/')
    .get(getCategories)
    .post(createCategory);

router.route('/:id')
    .get(getCategoryById)
    .patch(updateCategory)
    .delete(deleteCategory);

export default router;