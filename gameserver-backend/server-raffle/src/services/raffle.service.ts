import { User } from "../models/User";
import { supabase } from "../config/database";
import config from "../config/config";

class RaffleService {
    protected user: User | null;

    constructor(user: User) {
        this.user = user;
    }

    public async enterRaffle(): Promise<{ success: boolean; message: string }> {
      if (!this.user) {
        throw new Error('No user to register');
      }
      
      const result = await fetch(`${config.GAME_BASE_URL}/api/game/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.user)
      })
        .then((res) => res.json())
        .catch(err => console.log(err));

      if (!result || !result.uid) {
        return { success: false, message: 'Failed to register user' };
      }

      const { data: existing, error: checkError } = await supabase
        .from('raffle_table')
        .select('id')
        .eq('user_id', result.uid)
        .maybeSingle();

        if (checkError) {
          return { success: false, message: 'Database error during raffle entry' };
        }

        if (existing ) {
          return { success: false, message: 'User has already entered the raffle' };
        }

        const { error } = await supabase
        .from('raffle_table')
        .insert({ user_id: result.uid });

        if (error) {
          return { success: false, message: error.message };
        }

        return { success: true, message: 'Raffle entry submitted' };
    }
}

export default RaffleService;