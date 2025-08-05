import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Session } from './session.entity';
import { Account } from './account.entity';

@Entity('user')
export class User {
    @PrimaryColumn({ type: 'varchar', length: 36 })
    id: string;

    @Column('text')
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'boolean' })
    emailVerified: boolean;

    @Column({ type: 'text', nullable: true })
    image: string | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Session, (session) => session.user)
    sessions: Awaited<Session[]>;

    @OneToMany(() => Account, (account) => account.user)
    accounts: Awaited<Account[]>;
}
