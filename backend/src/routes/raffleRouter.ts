import { Router, Request, Response } from "express";
import { sendResponse } from "../controllers/leaderboardController";
import { registerUser } from "../controllers/raffleController";

const raffleRouter = Router();

raffleRouter.post("/register", (req: Request, res: Response) => {registerUser(req, res)});

export default raffleRouter;