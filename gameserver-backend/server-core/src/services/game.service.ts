import { User } from '../models/User'
import { supabase } from '../config/database';
import { Engagement } from '../models/Engagement';

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
    
    public async logEngagement(engagement: Engagement): Promise<{ OK: boolean; message: string }> {
        if (!this.user?.uid) {
            return { OK: false, message: 'No user ID provided' };
        }

        const newEngagement: Engagement = {
            user_id: this.user.uid,
            eng_type: engagement.eng_type,
            duration_seconds: engagement.duration_seconds ?? undefined,
            latitude: engagement.latitude ?? undefined,
            longitude: engagement.longitude ?? undefined,
            device_type: engagement.device_type ?? undefined,
            browser_type: engagement.browser_type ?? undefined,
            redirect: engagement.redirect ?? undefined
        }

        const { error } = await supabase
        .from('engagements')
        .insert(newEngagement);

        if (error) {
        console.error('❌ Failed to log engagement:', error.message);
        return { OK: false, message: 'Failed to log engagement' };
        }

        return { OK: true, message: 'Engagement logged' };

    }
    
}

export default GameService;