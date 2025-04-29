import { User } from "../models/User";
import { supabase } from "../config/database";
import config from "../config/config";
import { getCache, setCache } from "../utils/cache";

class RaffleService {
    protected user: User | null;

    constructor(user: User) {
        this.user = user;
    }

    public async enterRaffle(): Promise<{ success: boolean; message: string }> {
      const isProduction = process.env.NODE_ENV === 'production';
      console.log(`[raffle] isProduction: ${isProduction}`);
    
      if (!this.user) {
        throw new Error('No user to register');
      }
    
      const cacheKey = `register:${this.user.phone_number}`;
      let result: any = null;
    
      if (isProduction) {
        try {
          result = await getCache(cacheKey);
          console.log(`[raffle] Redis cache result for ${cacheKey}:`, result);
        } catch (err) {
          console.error(`[raffle] Error reading from Redis for ${cacheKey}:`, err);
        }
      }
    
      if (!result) {
        console.log(`[raffle] No cache found, calling game register API...`);
        try {
          const res = await fetch(`${config.GAME_BASE_URL}/api/game/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.user)
          });
    
          result = await res.json();
          console.log('[raffle] Register API result:', result);
        } catch (err) {
          console.error('[raffle] Fetch error:', err);
          return { success: false, message: 'Failed to register user in game service' };
        }
    
        if (result && isProduction) {
          try {
            await setCache(cacheKey, result, 30);
            console.log(`[raffle] Cached result for ${cacheKey}`);
          } catch (err) {
            console.error(`[raffle] Failed to set Redis cache for ${cacheKey}:`, err);
          }
        }
      }
    
      if (!result || !result.uid) {
        console.error('[raffle] Missing UID in registration result');
        return { success: false, message: 'Invalid game registration response' };
      }
    
      const { data: existing, error: checkError } = await supabase
        .from('raffle_table')
        .select('id')
        .eq('user_id', result.uid)
        .maybeSingle();
    
      if (checkError) {
        console.error('[raffle] Supabase check error:', checkError);
        return { success: false, message: 'Database error during raffle entry' };
      }
    
      if (existing) {
        console.log('[raffle] User already entered:', existing);
        return { success: false, message: 'User has already entered the raffle' };
      }
    
      const { error } = await supabase
        .from('raffle_table')
        .insert({ user_id: result.uid });
    
      if (error) {
        console.error('[raffle] Supabase insert error:', error);
        return { success: false, message: error.message };
      }
    
      console.log('[raffle] Raffle entry successfully submitted for user:', result.uid);
      return { success: true, message: 'Raffle entry submitted' };
    }
}

export default RaffleService;