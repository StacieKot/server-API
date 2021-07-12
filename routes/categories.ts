import express from 'express'
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from '../controllers/categories';
import { upload } from "../utils/multer";

export const categoryRouter = express.Router();

categoryRouter.get('', getCategories);

categoryRouter.get('/:id', getCategoryById);

categoryRouter.put('/:id', upload.single("image"), updateCategory);

categoryRouter.post('', upload.single("image"), createCategory);

categoryRouter.delete('/:id', deleteCategory);