import config from "./config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = config.SUPABASE_URL as string;
const supabaseKey = config.SUPABASE_KEY;

if (!supabaseKey) {
    throw new Error("SUPABASE_KEY is missing in the environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

const connectDB = async () => {
  const { error } = await supabase.from("users").select("uid").limit(1);
  
  if (error) {
    console.error("❌ Supabase connection error:", error.message);
    throw new Error("Could not connect to Supabase");
  }

  console.log('✅ Supabase database connected');
}
 
export { connectDB, supabase };