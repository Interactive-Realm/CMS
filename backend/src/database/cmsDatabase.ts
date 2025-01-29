import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabaseUrl = "https://cvcvqquiwbgrcskllsro.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseKey) {
  throw new Error("SUPABASE_KEY is missing in the environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

const authorization = async (email: string, password: string): Promise<string | null> => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("organisation_id") 
        .eq("email", email)
        .eq("password", password);
  
      if (error) {
        throw new Error(`Error fetching user: ${error.message}`);
      }
  
      if (data && data.length > 0) {
        return data[0].organisation_id;
      } else {
        console.error("No matching user found.");
        return null;
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error:", err.message);
      } else {
        console.error("Unexpected error:", err);
      }
      return null; // Return null if there's an error or no match
    }
  };
export { authorization }

  