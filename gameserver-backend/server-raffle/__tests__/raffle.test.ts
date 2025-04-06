import { describe, expect, test, beforeEach, afterEach } from '@jest/globals';
import dotenv from 'dotenv';
import request from 'supertest';
import server from '../src/server';

dotenv.config({ path: '.env.test' });

describe('Test raffle server endpoints', () => {
    test('Test a user entering raffle', async () => {
        const response = await request(server)
        .post('/api/raffle/enter')
        .send({
            'phone_number': '48578395',
            'email': 'test@user.dk',
            'first_name': 'foo',
            'last_name': 'bar',
        });

        expect(response.statusCode).toBe(201);
    });

    afterEach((done) => {
        server.close(done);
    });
});