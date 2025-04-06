import dotenv from 'dotenv';
import config from "./config/config";
import { connectDB } from './config/database';
import express, { Router } from "express";
import cors from 'cors';
import gameRouter from './routes/game.router';

export const app = express();
const PORT = config.PORT;

const baseRouter = Router();


// Application setup
app.use(express.json());
app.use(cors());
app.use('/api', baseRouter);

// Endpoints
baseRouter.use('/game', gameRouter);


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