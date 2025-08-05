import { Injectable } from '@nestjs/common';
import { betterAuth } from 'better-auth';
import { createPool } from 'mysql2/promise';

@Injectable()
export class AuthService {
    private auth: ReturnType<typeof betterAuth>;

    constructor() {
        this.auth = betterAuth({
            emailAndPassword: {
                enabled: true,
            },
            database: createPool({
                host: '127.0.0.1',
                user: 'root',
                password: 'password',
                database: 'second-brain',
            }),
        });
    }

    signUp(name: string, email: string, password: string) {
        return this.auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
            },
        });
    }

    signIn(email: string, password: string) {
        return this.auth.api.signInEmail({
            body: {
                email,
                password,
            },
        });
    }

    signOut(headers: HeadersInit) {
        return this.auth.api.signOut({
            headers,
        });
    }
}
