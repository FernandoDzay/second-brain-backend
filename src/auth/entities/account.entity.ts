import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('account')
export class Account {
    @PrimaryColumn({ type: 'varchar', length: 36 })
    id: string;

    @Column('text')
    accountId: string;

    @Column('text')
    providerId: string;

    @Column({ type: 'varchar', length: 36 })
    userId: string;

    @ManyToOne(() => User, (user) => user.accounts)
    @JoinColumn({ name: 'userId' })
    user: Awaited<User>;

    @Column({ type: 'text', nullable: true })
    accessToken: string | null;

    @Column({ type: 'text', nullable: true })
    refreshToken: string | null;

    @Column({ type: 'text', nullable: true })
    idToken: string | null;

    @Column({ type: 'datetime', nullable: true })
    accessTokenExpiresAt: Date | null;

    @Column({ type: 'datetime', nullable: true })
    refreshTokenExpiresAt: Date | null;

    @Column({ type: 'text', nullable: true })
    scope: string | null;

    @Column({ type: 'text', nullable: true })
    password: string | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
