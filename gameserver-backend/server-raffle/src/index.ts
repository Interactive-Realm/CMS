import express, { Router } from 'express';
import cors from 'cors';
import raffleRouter from './routes/raffle.router';
import { connectDB } from '@shared/supabase/database';
import config from './config/config';

const PORT = config.PORT || 5000;

export const app = express();

const baseRouter = Router();

app.use(express.json());
app.use(cors());
app.use('/api', baseRouter);
baseRouter.use('/raffle', raffleRouter);

if (process.env.NODE_ENV !== 'test') {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    });
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}