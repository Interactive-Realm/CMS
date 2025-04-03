import {describe, expect, test, beforeAll} from '@jest/globals';
import dotenv from 'dotenv';
import { connectDB } from '../src/config/database';
import request from 'supertest';
import { app } from '../src/index';

dotenv.config({ path: '.env.test' });

describe('Test raffle services', () => {
    test('Test a entry raffle for user', async () => {
        const response = await request(app)
        .post('/api/raffle/participate')
        .send({
            'phone_number': '48578395',
            'email': 'test@user.dk',
            'first_name': 'foo',
        });

        expect(response.statusCode).toBe(201);
    });
});