import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: `../../.env.test` });
} else if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: `.env.development` });
} else if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: `.env.production` });
} else {
  // Default fallback
  dotenv.config();
}

const config =  {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
    GAME_BASE_URL: process.env.GAME_BASE_URL,
    RAFFLE_PORT: Number(process.env.RAFFLE_PORT),
};

export default config;