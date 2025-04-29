import { createClient } from 'redis';

const isProduction = process.env.NODE_ENV === 'production';

let redis: ReturnType<typeof createClient> | null = null;

if (isProduction) {
  console.log('[cache] Initializing Redis client...');

  redis = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  });

  redis.on('error', (err) => {
    console.error('[cache] Redis error event:', err);
  });

  redis.connect()
    .then(async () => {
      console.log('[cache] Redis connected');
      try {
        const pong = await redis!.ping();
        console.log('[cache] Redis ping:', pong);
      } catch (pingErr) {
        console.error('[cache] Redis ping failed:', pingErr);
      }
    })
    .catch((err) => {
      console.error('[cache] Redis connection error:', err);
    });
}

export async function getCache<T = any>(key: string): Promise<T | null> {
  if (!isProduction || !redis) return null;

  try {
    const redisPromise = redis.get(key);
    console.log(redisPromise)

    const timeoutPromise = new Promise<null>((_, reject) => 
      setTimeout(() => reject(new Error(`Redis timeout on get ${key}`)), 2000)
    );

    const result = await Promise.race([redisPromise, timeoutPromise]);
    console.log(result)

    return result ? JSON.parse(result as string) as T : null;
  } catch (err) {
    console.error(`[cache] Error getting key "${key}":`, err);
    return null;
  }
}

export async function setCache(key: string, value: unknown, ttl = 30): Promise<void> {
  if (!isProduction || !redis) return;

  try {
    await redis.set(key, JSON.stringify(value), { EX: ttl });
  } catch (err) {
    console.error(`[cache] Error setting key "${key}":`, err);
  }
}
