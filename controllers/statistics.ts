import { Request, Response } from "express";
import { ICardStatistics } from '../interfaces';
import { Statistics } from "../models/Statistics";

export const createCardStatistics = async (req: Request, res: Response) => {
  try {
    const card = await Statistics.create(req.body);
    res.status(200).json(card);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateCardStatistics = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const updatedStatistics: ICardStatistics | null = await Statistics.findByIdAndUpdate(id, req.body, {new: true});
    return res.json(updatedStatistics);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getStatistics = async (req: Request, res: Response) => {
  try {
    const statistics: ICardStatistics[] = await Statistics.find();
    res.status(200).send(statistics);
  } catch (error) {
    res.status(500);
  }
};

export const getCardStatisticsById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const cardStatistics: ICardStatistics | null = await Statistics.findById(id);

    if (cardStatistics) {
      return res.status(200).send(cardStatistics);
    }
    res.status(404);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const deleteCardStatisticsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Statistics.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (e) {
    res.status(500).send(e.message);
  }
}