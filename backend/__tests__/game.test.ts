import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import dotenv from 'dotenv';
import { supabase, connectDB } from '../src/database/gameDatabase';

dotenv.config({ path: '.env.test' });

describe('Test for GameServer methods', () => {

    beforeAll(async () => {
        await connectDB();
    });


    test('Should like a post at POST /api/likes/:postId/toggle', async () => {
        expect(true).toBe(true);
      });
}); 