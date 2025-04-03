
import GameServer from './GameServer';
import { User } from '../models/User';
import { supabase } from '../database/gameDatabase';


class RaffleServer extends GameServer {
  constructor(user: User) {
    super(user);
  }

  public async enterRaffle(): Promise<{ success: boolean; message: string; }> {
    const { data: existing, error: checkError } = await supabase
    .from('raffle_table')
    .select('id')
    .eq('user_id', this.user.uid)
    .maybeSingle();

    if (checkError) {
      return { success: false, message: 'Database error during raffle entry' };
    }

    if (existing) {
      return { success: false, message: 'User has already entered the raffle'};
    }

    const { error: insertError } = await supabase
    .from('raffle_table')
    .insert({ user_id: this.user.uid });

    if (insertError) {
      return { success: false, message: 'Database error during raffle entry' };
    }

    return { success: true, message: 'Raffle entry submitted' };
  }
}

export default RaffleServer;
