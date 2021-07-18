import { ICard, IResponse } from '../interfaces';
import Card from '../models/Cards';
import cloudinary from '../utils/cloudinary';

export const asyncCreateCard = async (body: ICard, files: any): Promise<ICard> => {
  const { word, translation, category } = body;

  const imageResult = files && files.image ? await cloudinary.uploader.upload(files.image[0].path) : '';
  const audioResult = files && files.audio ? await cloudinary.uploader.upload(files.audio[0].path, { resource_type: 'video' }) : '';

  const card = await Card.create({
    word,
    translation,
    category,
    image: imageResult.secure_url || '',
    image_cloudinary_id: imageResult.public_id || '',
    audio: audioResult.secure_url || '',
    audio_cloudinary_id: audioResult.public_id || '',
  });
  return card;
};

export const asyncGetCards = async (
  page: string | undefined,
  limit: string | undefined,
  category: string,
) : Promise<IResponse<ICard>> => {
  const _skip = page ? Number(page) : 0;
  const _limit = limit ? Number(limit) : 0;
  const cursor = category
    ? Card.collection.find({ category }).skip((_skip - 1) * _limit).limit(_limit)
    : Card.collection.find().skip((_skip - 1) * _limit).limit(_limit);
  const cards = {
    count: await cursor.count(),
    data: await cursor.toArray(),
  };
  return cards;
};

export const asyncGetCardById = async (id: string) : Promise<ICard | null> => {
  const card: ICard | null = await Card.findById(id);
  return card;
};

export const asyncDeleteCard = async (id: string): Promise<ICard | null> => {
  const deletedCard = await Card.findByIdAndDelete(id);

  if (deletedCard && deletedCard.image) {
    cloudinary.uploader.destroy(deletedCard.image_cloudinary_id);
  }

  if (deletedCard && deletedCard.audio) {
    cloudinary.uploader.destroy(deletedCard.audio_cloudinary_id);
  }

  return deletedCard;
};

export const asyncUpdateCard = async (
  id: string,
  body: ICard,
  files: any,
): Promise<ICard | null> => {
  const card = await Card.findById(id) as ICard;

  const {
    image, image_cloudinary_id, audio, audio_cloudinary_id,
  } = card;

  if (files && files.image && image_cloudinary_id) {
    await cloudinary.uploader.destroy(image_cloudinary_id);
  }

  if (files && files.audio && audio_cloudinary_id) {
    await cloudinary.uploader.destroy(audio_cloudinary_id);
  }

  const imageResult = (files && files.image)
    ? await cloudinary.uploader.upload(files.image[0].path)
    : { secure_url: image, public_id: image_cloudinary_id };

  const audioResult = (files && files.audio)
    ? await cloudinary.uploader.upload(files.audio[0].path, { resource_type: 'video' })
    : { secure_url: audio, public_id: audio_cloudinary_id };

  const data = {
    ...body,
    image: imageResult.secure_url,
    image_cloudinary_id: imageResult.public_id,
    audio: audioResult.secure_url,
    audio_cloudinary_id: audioResult.public_id,
  };

  const updatedCard: ICard | null = await Card.findByIdAndUpdate(id, data, { new: true });
  return updatedCard;
};
