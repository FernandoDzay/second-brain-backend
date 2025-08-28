import { Module } from '@nestjs/common';
import { CreateUserCommand } from './create-user.command';
import { AuthService } from '../auth/auth.service';

@Module({
    providers: [CreateUserCommand, AuthService],
})
export class CommandsModule {}
