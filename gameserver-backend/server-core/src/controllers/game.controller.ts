import { User } from '../models/User'
import { Request, Response } from "express";
import GameService from "../services/game.service";

export const registerUser = async (req: Request, res: Response) => {
    const { uid, email, phone_number } = req.body;

    if (!email || !phone_number) {
        return res.status(400).json({ error: 'Missing user fields' });
    }

    const user: User = { uid, email, phone_number };
    const gameservice = new GameService(user);

    const result = await gameservice.registerUser();

    if (!result.OK) {
        return res.status(400).json({ error: result.message });
    }

    return res.status(201).json({ message: result.message, uid: result.user_id });
};