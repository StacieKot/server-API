import mongoose from 'mongoose'
import { ICard } from '../interfaces';

const CardSchema =  new mongoose.Schema({
  word: {
    type: String,
    required: true
  },
  translation: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
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
})

export const Card = mongoose.model<ICard>('Cards', CardSchema);


