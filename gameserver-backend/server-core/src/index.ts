import dotenv from 'dotenv';
import config from "./config/config";
import { connectDB } from "@shared/supabase/database";
import express, { Router } from "express";
import cors from 'cors';

const app = express();
const PORT = config.PORT;

const apiRouter = Router();

app.use(express.json());

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