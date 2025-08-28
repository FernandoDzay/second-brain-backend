import { Injectable } from '@nestjs/common';
import { auth } from './auth';

@Injectable()
export class AuthService {
    createUser(email: string, name: string, password: string) {
        return auth.api.signUpEmail({
            body: {
                email,
                name,
                password,
            },
        });
    }
}
