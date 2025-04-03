import dotenv from "dotenv";
import config from './config/config';
import { connectDB } from "./config/database";
import express, { Router, type Express, type Request, type Response } from "express";
import raffleRouter from "./routes/raffleRouter";

export const app = express();
const PORT = config.PORT || 3000;

const apiRouter =  Router();

app.use(express.json());

app.use('/api', apiRouter);

// endpoints
apiRouter.use('/raffle', raffleRouter);

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