import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: `.env.${ process.env.NODE_ENV || 'development' }` });
}

const dbConfig =  {
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL
};

export default dbConfig;