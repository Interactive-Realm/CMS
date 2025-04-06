import { describe, expect, test } from '@jest/globals';
import dotenv from 'dotenv';
import request from 'supertest';
import { app } from '../src/index';

dotenv.config({ path: '.env.test' });

describe('Test game service endpoints', () => {

    test('Test a user registration', async () => {
        const response = await request(app)
        .post('/api/game/register')
        .send({
            'phone_number': '48578395',
            'email': 'test@user.dk',
            'first_name': 'foo',
        });
        console.log(response.body);
        expect(response.statusCode).toBe(201);
    });
});