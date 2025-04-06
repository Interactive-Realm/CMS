import { Router, Request, Response } from "express";
import { registerUser } from "../controllers/game.controller";

const gameRouter = Router();

gameRouter.post('/register', (req: Request, res: Response) => { registerUser(req, res) });

export default gameRouter;