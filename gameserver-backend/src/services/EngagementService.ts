import { User } from "../models/User";
import { supabase } from "../config/database";
import { Engagement } from "../models/Engagement";

export class EngagementServer {
    protected user: User | null;
    protected eng_type: 'play' | 'visit';

    constructor(user: User, eng_type: 'play' | 'visit') {
        this.user = user;
        this.eng_type = eng_type;
    }

    public async logEngagement(): Promise<void> {
        if (!this.user || !this.user.uid) {
            throw new Error('No user ID available to log engagement');
        }

        const newEngagement: Engagement = {
            user_id: this.user.uid,
            eng_type: this.eng_type,
        }

        const { error } = await supabase
        .from('engagements')
        .insert(newEngagement);

        if (error) {
            console.error('❌ Failed to log engagement:', error.message);
        }

        console.log('✅ Engagement logged successfully');
    } 
}
