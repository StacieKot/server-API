import mongoose from 'mongoose';

export interface ICard extends mongoose.Document {
  word: string;
  translation: string;
  category: string;
  image: string;
  audio: string;
  image_cloudinary_id: string;
  audio_cloudinary_id: string;
  statisticsId?: string;
}

export interface Item extends ICard {
  id: string;
}

export interface Items {
  [key: string]: Item;
}

export interface ICardStatistics extends mongoose.Document {
  clicks: number,
  correctAnswers: number,
  failures: number,
}

export interface ICategoty extends mongoose.Document {
  categoryName: string,
  image: string,
  totalWords:number,
  image_cloudinary_id?: string
}

export interface IImage extends mongoose.Document {
  url: string,
}

export interface MulterRequest extends Request {
  file: any;
}

