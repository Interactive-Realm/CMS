import { Request, Response } from "express";

export const sendResponse = (req: Request, res: Response) => {
    console.log("Received request");
    res.send("Leaderboard router working");
}