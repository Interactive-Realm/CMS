import dotenv from 'dotenv';
import config from "./config/config";
import { connectDB } from './config/database';
import express, { Router } from "express";
import cors from 'cors';
import gameRouter from './routes/game.router';
import engagementRouter from './routes/engagement.router';

export const app = express();
const CORE_PORT = config.CORE_PORT;

const baseRouter = Router();


// Application setup
app.use(express.json());
app.use(cors());
app.use('/api', baseRouter);

// Endpoints
baseRouter.use('/game', gameRouter);
baseRouter.use('/engagements', engagementRouter);

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

if (process.env.NODE_ENV !== 'test') {
  connectDB().then(() => {
    const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

    app.listen(CORE_PORT, host, () => {
      console.log(`🚀 Game Server running on ${host}:${CORE_PORT} in ${process.env.NODE_ENV} mode`);
    });
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}