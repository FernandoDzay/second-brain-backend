import { Injectable } from '@nestjs/common';
import { betterAuth } from 'better-auth/*';
import { createPool } from 'mysql2/promise';
// import { drizzleAdapter } from "better-auth/adapters/";

@Injectable()
export class BetterAuthService {
    private auth: ReturnType<typeof betterAuth>;

    constructor() {
        this.auth = betterAuth({
            database: createPool({
                host: '127.0.0.1',
                user: 'root',
                password: 'password',
                database: 'second-brain',
            }),
        });
    }

    getAuth() {
        return this.auth;
    }
}
