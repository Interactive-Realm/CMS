import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'development';

// Build the correct path dynamically
const envPath = path.resolve(__dirname, `../../.env.${env}`);

// Load the env file
dotenv.config({ path: envPath });

const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: Number(process.env.PORT),
  SUPABASE_KEY: process.env.SUPABASE_KEY,
  SUPABASE_URL: process.env.SUPABASE_URL,
  CORE_PORT: Number(process.env.CORE_PORT)
};

export default config;