import 'dotenv/config';
import { betterAuth } from 'better-auth';
import { createPool } from 'mysql2/promise';

const trustedOrigins = ['https://second-brain.luisdzay.com'];
if (process.env.NODE_ENV === 'development') trustedOrigins.push('http://localhost:5173');

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    trustedOrigins,
    database: createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    }),
});
