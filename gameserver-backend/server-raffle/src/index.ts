import express, { Router } from 'express';
import cors from 'cors';
import raffleRouter from './routes/raffle.router';
import { connectDB } from './config/database';
import config from './config/config';

const RAFFLE_PORT = config.RAFFLE_PORT || 5055;

export const app = express();

const baseRouter = Router();

app.use(express.json());
app.use(cors());
app.use('/api', baseRouter);
baseRouter.use('/raffle', raffleRouter);

if (process.env.NODE_ENV !== 'test') {
  connectDB().then(() => {
    const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

    app.listen(RAFFLE_PORT, host, () => {
      console.log(`🚀 Raffle Server running on ${host}:${RAFFLE_PORT} in ${process.env.NODE_ENV} mode`);
    });
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}