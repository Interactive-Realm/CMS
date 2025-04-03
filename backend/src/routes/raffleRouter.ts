import { Router, Request, Response } from "express";
import { raffleEntry } from "../controllers/raffleController";

const raffleRouter = Router();

raffleRouter.post('/participate', (req: Request, res: Response) => {raffleEntry(req, res)});

export default raffleRouter;