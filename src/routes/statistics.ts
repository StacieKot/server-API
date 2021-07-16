import express from 'express';
import {
  getStatistics, 
  getCardStatisticsById, 
  createCardStatistics, 
  updateCardStatistics, 
  deleteCardStatisticsById,
} from '../controllers/statistics';

const statisticsRouter = express.Router();

statisticsRouter.get('', getStatistics);
statisticsRouter.get('/:id', getCardStatisticsById);
statisticsRouter.post('', createCardStatistics);
statisticsRouter.put('/:id', updateCardStatistics);
statisticsRouter.delete('/:id', deleteCardStatisticsById);

export default statisticsRouter;
