import { Router, Request, Response } from "express";
import { sendResponse } from "../controllers/leaderboardController";

const leaderboardRouter = Router();

leaderboardRouter.get("/", sendResponse)

export default leaderboardRouter;