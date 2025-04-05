const dotenv = require('dotenv');
const { supabase } = require('./src/config/database');

dotenv.config({ path: '.env.test' });

beforeAll(async () => {
    console.log('🧹 Cleaning up test DB...');

    const tablesToClear = [
        { name: 'raffle_table', pk: 'id' },
        { name: 'engagements', pk: 'id' },
        { name: 'users', pk: 'uid' }
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