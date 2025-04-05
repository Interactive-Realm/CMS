import GameServer from './GameService'
import { User } from '../models/User';
import { supabase } from '../config/database';
import { EngagementServer } from './EngagementService';

class RaffleServer extends GameServer {
    constructor(user: User) {
        super(user);
      }

    public async enterRaffle(): Promise<{ success: boolean; message: string }> {
        if (!this.user) {
            throw new Error('No user to register');
        }

        const registration = await this.registerUser();

        if (!registration.OK) {
            return { success: false, message: 'Error registrating user: ' + registration.message };
        }

        const { data: existing, error: checkError } = await supabase
        .from('raffle_table')
        .select('id')
        .eq('user_id', this.user?.uid)
        .maybeSingle();

        if (checkError) {
            return { success: false, message: 'Database error during raffle entry' };
        }

        if (existing ) {
            return { success: false, message: 'User has already entered the raffle' };
        }

        const { error: insertError } = await supabase
        .from('raffle_table')
        .insert({ user_id: this.user?.uid });

        if (insertError) {
            return { success: false, message: 'Database error during insert' };
        }

        const engagement: EngagementServer = new EngagementServer(this.user, 'play');
        await engagement.logEngagement();

        return { success: true, message: 'Raffle entry submitted' };
    }
}

export default RaffleServer;