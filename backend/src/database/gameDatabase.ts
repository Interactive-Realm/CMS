import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabaseUrl = "https://sdauykhinqbirdyribze.supabase.co";
const supabaseKey = process.env.SUPABASEGAME_KEY;

if (!supabaseKey) {
  throw new Error("SUPABASEGAME_KEY is missing in the environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

const gameData = async () => {
  try {
    const { data, error } = await supabase
      .from("engagement")
      .select("*");

    if (error) {
      throw new Error(`Error fetching engagement data: ${error.message}`);
    }

    console.log(data);

    if (data && data.length > 0) {
      return data; 
    } else {
      console.error("No engagement data found.");
      return null;
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error:", err.message);
    } else {
      console.error("Unexpected error:", err);
    }
    return null; // Return null if there's an error or no data
  }
};

export {gameData}
