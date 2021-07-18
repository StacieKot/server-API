import { Request, Response } from 'express';
import {
  asyncCreateCard, asyncDeleteCard, asyncGetCardById, asyncGetCards, asyncUpdateCard,
} from '../controllers/cards';

export const сreateCard = async (req : Request, res: Response): Promise<void> => {
  try {
    const { body, files } = req;
    const card = await asyncCreateCard(body, files);
    res.status(200).json(card);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getCards = async (req : Request, res: Response): Promise<void> => {
  try {
    const { page, limit, category } = req.query;
    const cards = await asyncGetCards(page as string, limit as string, category as string);
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getCardById = async (req : Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const card = await asyncGetCardById(id);
    if (card) {
      res.status(200).json(card);
    } else {
      res.status(404).send('card not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteCard = async (req : Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedCard = await asyncDeleteCard(id);
    if (deletedCard) {
      res.sendStatus(204);
    } else {
      res.status(404).send('card not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateCard = async (req : Request, res: Response): Promise<void> => {
  try {
    const { params, body, files } = req;
    const { id } = params;
    const updatedCard = await asyncUpdateCard(id, body, files);
    if (updatedCard) {
      res.status(200).json(updatedCard);
    } else {
      res.status(404).send('card not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
