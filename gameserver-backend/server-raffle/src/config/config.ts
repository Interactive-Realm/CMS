import dotenv from 'dotenv';
import path from 'path';

const envFileMap: Record<string, string> = {
  test: '../../../.env.test',
  development: '../../.env.development',
  production: '../../.env.production',
};

const nodeEnv = process.env.NODE_ENV || 'development';
const relativeEnvPath = envFileMap[nodeEnv] || '../../.env';
const envPath = path.resolve(__dirname, relativeEnvPath);

console.log(`[config] Loading environment: ${nodeEnv} from ${envPath}`);
dotenv.config({ path: envPath });

const config =  {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
    GAME_BASE_URL: process.env.GAME_BASE_URL,
    RAFFLE_PORT: Number(process.env.RAFFLE_PORT),
};

export default config;