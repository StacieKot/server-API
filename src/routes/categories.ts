import express from 'express';
import passport from 'passport';
import {
  getCategories, getCategoryById, updateCategory, createCategory, deleteCategory,
} from '../controllers/categories';
import upload from '../utils/multer';

const categoryRouter = express.Router();

categoryRouter.get('', getCategories);
categoryRouter.get('/:id', getCategoryById);
categoryRouter.put('/:id', passport.authenticate('jwt', { session: false }), upload.single('image'), updateCategory);
categoryRouter.post('', passport.authenticate('jwt', { session: false }), upload.single('image'), createCategory);
categoryRouter.delete('/:id', passport.authenticate('jwt', { session: false }), deleteCategory);

export default categoryRouter;
