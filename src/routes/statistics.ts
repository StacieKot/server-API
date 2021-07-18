import express from 'express';
import {
  getStatistics,
  getCardStatisticsById,
  createCardStatistic,
  updateCardStatistics,
  deleteCardStatisticsById,
} from '../middleware/statistics';

const statisticsRouter = express.Router();

statisticsRouter.get('', getStatistics);
statisticsRouter.get('/:id', getCardStatisticsById);
statisticsRouter.post('', createCardStatistic);
statisticsRouter.put('/:id', updateCardStatistics);
statisticsRouter.delete('/:id', deleteCardStatisticsById);

export default statisticsRouter;
