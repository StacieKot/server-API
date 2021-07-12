import mongoose from 'mongoose'
import { ICategoty } from '../interfaces';

const CategorySchema =  new mongoose.Schema({
  categoryName: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  image_cloudinary_id: {
    type: String,
  },
  totalWords: {
    type: Number,
    required: true
  },
})

export const Category = mongoose.model<ICategoty>('Categories', CategorySchema);


