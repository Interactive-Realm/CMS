import { Request, Response } from "express";
import RaffleServer from "../services/RaffleServer";
import { User } from "../models/User";

export const registerUser = (req: Request, res: Response) => {
    const { uid, email, phone_number } = req.body;

    if (!uid || !email || !phone_number) {
        return res.status(400).json({ error: 'Missing user fields' });
      }

    const user: User = { uid, email, phone_number };
    const raffleServer = new RaffleServer(user);

    raffleServer.enterRaffle();

    res.status(200).json({ message: 'Check' });
}