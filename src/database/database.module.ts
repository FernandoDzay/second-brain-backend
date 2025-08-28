import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../auth/entities/account.entity';
import { Session } from '../auth/entities/session.entity';
import { User } from '../auth/entities/user.entity';
import { Verification } from '../auth/entities/verification.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { ConfigService } from '@nestjs/config';
import { EnvType } from 'src/env-validator';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService<EnvType>) => ({
                type: 'mysql',
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_DATABASE'),
                synchronize: true,
                timezone: '-06:00',
                autoLoadEntities: true,
                entities: [Account, Session, User, Verification, Payment, Tag],
            }),
        }),
    ],
})
export class DatabaseModule {}
