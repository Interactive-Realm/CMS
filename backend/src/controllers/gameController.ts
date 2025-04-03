import { Request, Response } from "express";
import { User } from "../models/User";
import GameServer from "../services/GameServer";

export const registerUser = async (req: Request, res: Response) => {
    const { uid, email, phone_number } = req.body;

    if (!uid || !email || !phone_number) {
        return res.status(400).json({ error: 'Missing user fields' });
      }

    const user: User = { uid, email, phone_number };
    const gameServer = new GameServer(user);

    try {
      const createdUser = await gameServer.createUser();
      return res.status(201).json({ message: 'User created', user: createdUser });
    } catch (error) {
      res.status(500).json({ error: 'Failed to register user' });
    }

};