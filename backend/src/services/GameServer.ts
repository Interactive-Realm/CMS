import { User } from "../models/User";
import { supabase } from "../database/gameDatabase";
class GameServer {
    protected user: User | null;

    constructor(user: User) {
        this.user = user;
    }

    public getUser(): User | null {
        return this.user;
    }

    public async registerUser(): Promise<void> {
        if (!this.user) {
            throw new Error("No user to register");
        }
    
        const { email, phone_number } = this.user;
    
        if (!email || !phone_number) {
            throw new Error("Both email and phone number are required.");
        }
        
        const payload: Partial<User> = {};
        Object.entries(this.user).forEach(([key, value]) => {
            if (value !== undefined && value !== null && key !== 'uid' && key !== 'created_at') {
                payload[key as keyof User] =
                    key === 'created_at' && value instanceof Date
                        ? value.toISOString()
                        : value;
            }
        });
    
        const { error } = await supabase
            .from('users')
            .upsert([payload], {
                onConflict: 'email,phone_number'
            })
            .select()
            .single();
    
        if (error) {
            console.error('CMS Registration Failed:', error);
            throw new Error("User registration failed. Cannot proceed.");
        }  
    }
};

export default GameServer;
