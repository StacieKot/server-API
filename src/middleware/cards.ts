import { Request, Response } from 'express';
import { asyncCreateCard } from '../controllers/cards';

export const сreateCard = async (req : Request, res: Response) => {
  try {
    const card = await asyncCreateCard(req)
    res.status(200).json(card);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
