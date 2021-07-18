import mongoose from 'mongoose';
import { ICategory } from '../interfaces';

const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
  },
  image: {
    type: String,
  },
  image_cloudinary_id: {
    type: String,
  },
  totalWords: {
    type: Number,
    required: true,
  },
});

const Category = mongoose.model<ICategory>('Categories', CategorySchema);

export default Category;
