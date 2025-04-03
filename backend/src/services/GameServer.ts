import { User } from "../models/User";
import { supabase } from "../database/gameDatabase";

class GameServer {
    protected user: User;

    constructor(user: User) {
        this.user = user;
    }

    public async createUser(): Promise<User> {
        const { data, error } = await supabase
        .from('users')
        .insert(this.user)
        .select()
        .single();

        if (error) {
            console.log(error.message);
            throw new Error('Failed to insert user');

        }
        return data;
    }
    
};

export default GameServer;
