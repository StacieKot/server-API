import mongoose from 'mongoose';
import { ICardStatistics } from '../interfaces';

const CardStatisticsSchema = new mongoose.Schema({
  clicks: {
    type: Number,
    required: true,
  },
  correctAnswers: {
    type: Number,
    required: true,
  },
  failures: {
    type: Number,
    required: true,
  },

});

const Statistics = mongoose.model<ICardStatistics>('Statistics', CardStatisticsSchema);

export default Statistics;
