import { User } from "../models/User";
import { supabase } from "../config/database";

class GameServer {
    protected user: User | null;

    constructor(user: User) {
        this.user = user;
    }

    public async registerUser(): Promise<{ OK: boolean, message: string }> {
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

        this.user = data;

        return { OK: true, message: 'Succes' };

    }
}

export default GameServer;
