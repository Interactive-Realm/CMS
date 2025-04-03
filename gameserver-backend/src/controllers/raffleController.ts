import { Request, Response } from "express";
import RaffleServer from "../services/RaffleService";
import { User } from "../models/User";

export const raffleEntry = async (req: Request, res: Response) => {
    const { uid, email, phone_number } = req.body;

    if (!email || !phone_number) {
        return res.status(400).json({ error: 'Missing user fields' });
    }

    const user: User = { uid, email, phone_number };
    const raffleServer = new RaffleServer(user);

    const result = await raffleServer.enterRaffle();

    if (!result.success) {
        return res.status(400).json({ error: result.message });
    }

    return res.status(201).json({ message: result.message });
};