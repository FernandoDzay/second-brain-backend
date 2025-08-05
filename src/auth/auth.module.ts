import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/database/database.config';

@Module({
    controllers: [AuthController],
    imports: [TypeOrmModule.forRoot(typeOrmConfig)],
    providers: [AuthService],
})
export class AuthModule {}
