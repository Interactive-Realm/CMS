const dotenv = require('dotenv');
const { supabase } = require('./server-core/src/config/database');

dotenv.config({ path: './.env.test' });

beforeAll(async () => {
    console.log('Cleaning up test DB...');

    const tables = ['raffle_table','users'];
  
    for (const table of tables) {
      if (table === 'users') {
        const { error } = await supabase
        .from(table)
        .delete()
        .neq('uid', 0);
        if (error) {
          console.error(`❌ Failed to clear ${table}:`, error.message);
        } else {
          console.log(`✅ Cleared ${table}`);
        }
      } else {
        const { error } = await supabase
        .from(table)
        .delete()
        .neq('id', 0);
      if (error) {
        console.error(`❌ Failed to clear ${table}:`, error.message);
      } else {
        console.log(`✅ Cleared ${table}`);
      }
      }
    }
});