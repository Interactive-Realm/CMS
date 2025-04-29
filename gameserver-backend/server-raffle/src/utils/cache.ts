import { createClient } from 'redis';

const redis = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redis.connect().catch((err) => {
  console.error('Redis connection error:', err);
});

export async function getCache<T = any>(key: string): Promise<T | null> {
  const result = await redis.get(key);
  return result ? JSON.parse(result) as T : null;
}

export async function setCache(key: string, value: unknown, ttl = 30): Promise<void> {
  await redis.set(key, JSON.stringify(value), { EX: ttl });
}