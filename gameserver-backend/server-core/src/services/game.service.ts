import { User } from '../models/User'
import { supabase } from '../config/database';

class GameService {
    protected user: User | null;

    constructor(user: User) {
        this.user = user;
    }

    public async registerUser(): Promise<{ OK: boolean, message: string, user_id?: number }> {
        if (!this.user) {
            throw new Error("No user to register");
        }

        const payload: Partial<User> = {};
        Object.entries(this.user).forEach(([key, value]) => {
            if (value !== undefined && value !== null && key !== 'uid' && key !== 'created_at') {
                payload[key as keyof User] = value;
            }
        });

        const { error, data } = await supabase
        .from('users')
        .upsert([payload], {
            onConflict: 'email'
        })
        .select()
        .single();

        if (error) {
            return { OK: false, message: error.message };
        }

        return { OK: true, message: 'Success', user_id: data.uid };

    }
}

export default GameService;