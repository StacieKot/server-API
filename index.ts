import express, { NextFunction } from 'express'
import mongoose from 'mongoose'
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { cardsRouter } from './routes/card';
import { statisticsRouter } from './routes/statistics';
import { categoryRouter } from './routes/categories';
import path from 'path';  
import { Request, Response } from "express";

path.join(__dirname, '.env');

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

 const startApp = async () => {
  try {
      await mongoose.connect(process.env.MONGO_URI as string, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
  } catch (error) {
      console.log(error)
  }
}

app.use(express.json());
app.use(cors());
app.use(function (req : Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(helmet());
app.use('/cards', cardsRouter);
app.use('/category', categoryRouter);
app.use('/statistics', statisticsRouter);

startApp()

