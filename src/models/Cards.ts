import mongoose from 'mongoose';
import { ICard } from '../interfaces';

const CardSchema = new mongoose.Schema({
  word: {
    type: String,
  },
  translation: {
    type: String,
  },
  category: {
    type: String,
  },
  image: {
    type: String,
  },
  audio: {
    type: String,
  },
  image_cloudinary_id: {
    type: String,
  },
  audio_cloudinary_id: {
    type: String,
  },
  statisticsId: {
    type: String,
  },
});

const Card = mongoose.model<ICard>('Cards', CardSchema);

export default Card;
