const dotenv = require('dotenv');
const { supabase } = require('./src/config/database');

dotenv.config({ path: '.env.test' });

beforeAll(async () => {
    console.log('🧹 Cleaning up test DB...');

    const tablesToClear = [
        { name: 'users', pk: 'uid' },
        { name: 'raffle_table', pk: 'id' }
    ];

    for (const { name, pk } of tablesToClear) {
        const { error } = await supabase
            .from(name)
            .delete()
            .neq(pk, 0); 
        if (error) {
            console.error(`❌ Failed to clear ${name}:`, error.message);
        } else {
            console.log(`✅ Cleared ${name}`);
        }
    }
});