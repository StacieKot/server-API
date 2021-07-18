import { ICardStatistics } from '../interfaces';
import Statistics from '../models/Statistics';

export const asyncCreateCardStatistic = async (
  body: ICardStatistics,
) : Promise<ICardStatistics> => {
  const card = await Statistics.create(body);
  return card;
};

export const asyncUpdateCardStatistic = async (
  id: string,
  body: ICardStatistics,
): Promise<ICardStatistics | null> => {
  const updatedStatistics: ICardStatistics | null = (
    await Statistics.findByIdAndUpdate(id, body, { new: true })
  );
  return updatedStatistics;
};

export const asyncGetStatistics = async (): Promise<ICardStatistics[]> => {
  const statistics = await Statistics.find();
  return statistics;
};

export const asyncGetCardStatisticsById = async (id: string): Promise<ICardStatistics | null> => {
  const cardStatistics = await Statistics.findById(id);
  return cardStatistics;
};

export const asyncDeleteCardStatisticsById = async (
  id: string,
): Promise<ICardStatistics | null> => {
  const deletedStatistic = await Statistics.findByIdAndDelete(id);
  return deletedStatistic;
};
