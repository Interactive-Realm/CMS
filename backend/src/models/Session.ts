export interface Session {
    id: number;
    created_at?: string;
    duration_seconds?: number;
    user_id: number;
    eng_type: 'play' | 'visit';
    latitude: number;
    longitude: number;
    device_type: 'PC,Windows' | 'Mobile,iOS' | 'Mobile,Android';
    browser_type: string;
}