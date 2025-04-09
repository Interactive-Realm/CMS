import { User } from '../models/User'
import { Request, Response } from "express";
import GameService from "../services/game.service";
import { Engagement } from '../models/Engagement';
import { supabase } from '../config/database';

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

export const handleLogEngagement = async (req: Request, res: Response) => {
    const {
        user_id,
        eng_type,
        duration_seconds,
        latitude,
        longitude,
        device_type,
        browser_type,
        redirect
      } = req.body;

      if (!user_id || !eng_type) {
        return res.status(400).json({ error: 'Missing required fields: user_id or eng_type' });
      }

      const engagement: Engagement = {
        user_id,
        eng_type,
        duration_seconds,
        latitude,
        longitude,
        device_type,
        browser_type,
        redirect
      };

      const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('uid', user_id)
      .maybeSingle();

      if (userError || !user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const gameservice = new GameService(user);
      const result = await gameservice.logEngagement(engagement);

      return res.status(result.OK ? 201 : 500).json(result.message);
};