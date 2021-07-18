import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import * as dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import authRouter from './routes/auth';
import categoryRouter from './routes/categories';
import statisticsRouter from './routes/statistics';
import cardsRouter from './routes/card';
import strategy from './middleware/passport';

path.join(__dirname, '.env');

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

const startApp = async () => {
  await mongoose.connect(process.env.MONGO_URI as string, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  app.listen(PORT);
};

const allowedOrigins = ['https://staciekot-english-for-kids.netlify.app', 'http://127.0.0.1:5501', 'http://127.0.0.1:5500'];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(passport.initialize());
passport.use(strategy);
app.use(cors(options));
app.use(express.json());
app.use(helmet());
app.use('/cards', cardsRouter);
app.use('/category', categoryRouter);
app.use('/statistics', statisticsRouter);
app.use('/auth', authRouter);

startApp();
