import { Request, Response } from 'express';
import {
  asyncCreateCardStatistic,
  asyncDeleteCardStatisticsById,
  asyncGetCardStatisticsById,
  asyncGetStatistics,
  asyncUpdateCardStatistic,
} from '../controllers/statisticsControllers';

export const createCardStatistic = async (req: Request, res: Response) : Promise<void> => {
  try {
    const { body } = req;
    const statistic = await asyncCreateCardStatistic(body);
    res.status(200).json(statistic);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateCardStatistics = async (req: Request, res: Response) : Promise<void> => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedStatistic = await asyncUpdateCardStatistic(id, body);
    res.status(200).json(updatedStatistic);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getStatistics = async (req: Request, res: Response) : Promise<void> => {
  try {
    const statistics = await asyncGetStatistics();
    res.status(200).json(statistics);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getCardStatisticsById = async (req: Request, res: Response) : Promise<void> => {
  try {
    const { id } = req.params;
    const statistic = await asyncGetCardStatisticsById(id);
    if (statistic) {
      res.status(200).json(statistic);
    } else {
      res.status(404);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteCardStatisticsById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedStatistic = await asyncDeleteCardStatisticsById(id);
    if (deletedStatistic) {
      res.sendStatus(204);
    } else {
      res.status(404);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
