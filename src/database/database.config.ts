import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Account } from '../auth/entities/account.entity';
import { Session } from '../auth/entities/session.entity';
import { User } from '../auth/entities/user.entity';
import { Verification } from '../auth/entities/verification.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'second-brain',
    entities: [Account, Session, User, Verification],
    synchronize: true,
    timezone: 'America/Mexico_City',
};
