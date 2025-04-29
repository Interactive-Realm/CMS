import { Router, Request, Response } from "express";
import { raffleEntry } from "../controllers/raffle.controller";

const raffleRouter = Router();

raffleRouter.post('/enter', (req: Request, res: Response) => { raffleEntry(req, res) });

export default raffleRouter;
