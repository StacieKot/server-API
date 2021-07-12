import { Request, Response } from "express";
import { ICard } from '../interfaces';
import { Card } from "../models/Cards";
import cloudinary from "../utils/cloudinary";

export const createCard = async (req : Request, res: Response) => {
  try {
    if(req.files) {
      const { files } = req as any;
      const imageResult = await cloudinary.uploader.upload(files.image[0].path);
      const audioResult = await cloudinary.uploader.upload(files.audio[0].path, { resource_type: "video" });

      const card = await Card.create({
        word: req.body.word,
        translation: req.body.translation,
        category: req.body.category,
        image: imageResult.secure_url,
        image_cloudinary_id: imageResult.public_id,
        audio: audioResult.secure_url,
        audio_cloudinary_id: audioResult.public_id,
      });

      res.status(200).json(card);
    }
  } catch (err) {
    throw err;
  }
};

export const getCards = async (req: Request, res: Response) => {
  try {
    const { page, limit, category } = req.query;
    const _skip = page ? Number(page) : 0;
    const _limit = limit ? Number(limit) : 0;
    const cursor = category 
      ? Card.collection.find({category}).skip((_skip - 1) * _limit).limit(_limit)
      : Card.collection.find().skip((_skip - 1) * _limit).limit(_limit);
    const cards = {
      count: await cursor.count(),
      data: await cursor.toArray()
    }
    res.status(200).send(cards);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getCardById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const card: ICard | null = await Card.findById(id);

    if (card) {
      return res.status(200).send(card);
    }
    
    res.status(404).send("card not found");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const updateCard = async (req: Request, res: Response) => {
  try {
    const { params, body } = req;
    const { files } = req as any;
    const card = await Card.findById(params.id) as ICard;

    const { image, image_cloudinary_id, audio, audio_cloudinary_id } = card;

    if (files && files.image) {
      await cloudinary.uploader.destroy(image_cloudinary_id);
    }
    if (files && files.audio) {
      await cloudinary.uploader.destroy(audio_cloudinary_id);
    }

    const imageResult = (files && files.image) 
      ? await cloudinary.uploader.upload(files.image[0].path) 
      : {secure_url: image, public_id: image_cloudinary_id};

    const audioResult = (files && files.audio)
      ? await cloudinary.uploader.upload(files.audio[0].path, { resource_type: "video" }) 
      : {secure_url: audio, public_id: audio_cloudinary_id};

    const data = { 
      ...body, 
      image: imageResult.secure_url,
      image_cloudinary_id: imageResult.public_id,
      audio: audioResult.secure_url,
      audio_cloudinary_id: audioResult.public_id,
    };

    const updatedCard: ICard | null = await Card.findByIdAndUpdate(params.id, data, {new: true});
    return res.json(updatedCard);
  } catch(error) {
    res.status(500).send(error.message);
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCard =  await Card.findByIdAndDelete(id);
    if (deletedCard) {
      const { image_cloudinary_id, audio_cloudinary_id } = deletedCard;
      await cloudinary.uploader.destroy(image_cloudinary_id);
      await cloudinary.uploader.destroy(audio_cloudinary_id);
      res.sendStatus(204);
    }
  } catch(error) {
    res.status(500).send(error.message);
  }
}

