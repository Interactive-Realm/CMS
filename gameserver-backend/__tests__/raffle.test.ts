import {describe, expect, test, beforeAll} from '@jest/globals';
import dotenv from 'dotenv';
import { connectDB } from '../src/config/database';
import request from 'supertest';

dotenv.config({ path: '.env.test' });

describe('Test raffle services', () => {
    test('Test a entry raffle for user', () => {
        const response = await request
    });
});