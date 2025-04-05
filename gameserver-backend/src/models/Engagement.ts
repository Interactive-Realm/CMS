export interface Engagement {
    id?: number;
    created_at?: Date; 
    duration_seconds?: number;
    user_id?: number;
    eng_type: 'play' | 'visit'; 
    latitude?: number; 
    longitude?: number;
    device_type?: string;
    browser_type?: string;
    redirect?: string;
  }