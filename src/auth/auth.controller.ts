import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-up')
    signUp(@Body() body: any) {
        return this.authService.signUp(body.name, body.email, body.password);
    }

    @Post('sign-out')
    signOut(@Req() req: any) {
        return this.authService.signOut(req.headers);
    }
}
