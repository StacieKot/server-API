import express from 'express'
import { 
  getStatistics, 
  getCardStatisticsById, 
  createCardStatistics, 
  deleteCardStatisticsById, 
  updateCardStatistics 
} from '../controllers/statistics';

export const statisticsRouter = express.Router();

statisticsRouter.get('', getStatistics);

statisticsRouter.get("/:id", getCardStatisticsById);

statisticsRouter.post('', createCardStatistics);

statisticsRouter.put("/:id", updateCardStatistics);

statisticsRouter.delete("/:id", deleteCardStatisticsById);