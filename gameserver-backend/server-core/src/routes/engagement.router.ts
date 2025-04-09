import { Router, Request, Response } from "express";
import { handleLogEngagement } from "../controllers/game.controller";

const engagementRouter = Router();

engagementRouter.post('/', (req: Request, res: Response) => { handleLogEngagement(req, res) });

export default engagementRouter;