import { afterEach, beforeEach, describe, expect, test } from '@jest/globals';
import dotenv from 'dotenv';
import request from 'supertest';
import server from '../src/server';
import { supabase } from '../src/config/database';

dotenv.config({ path: '.env.test' });

let testUserId: number;

describe('Test engagement service endpoints', () => {

    beforeEach(async () => {
        const { data, error } = await supabase
        .from('users')
        .insert({
        email: 'test@engage.dk',
        phone_number: '12345678',
        first_name: 'Testy'
        })
        .select()
        .single();

    if (error || !data) {
        throw new Error('❌ Failed to insert test user: ' + error?.message);
    }

    testUserId = data.uid;
    });

    afterEach((done) => {
        server.close(done);
    })

    test('Test a new enagement', async () => {
        const response = await request(server)
        .post('/api/engagements')
        .send({
            user_id: testUserId,
            eng_type: 'play',
            duration_seconds: 90,            
        });

        expect(response.statusCode).toBe(201);
    })
});