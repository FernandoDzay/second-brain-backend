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

@Entity('session')
export class Session {
    @PrimaryColumn({ type: 'varchar', length: 36 })
    id: string;

    @Column()
    expiresAt: Date;

    @Column({ type: 'varchar', length: 255, unique: true })
    token: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: 'text', nullable: true })
    ipAddress: string | null;

    @Column({ type: 'text', nullable: true })
    userAgent: string | null;

    @Column({ type: 'varchar', length: 36 })
    userId: string;

    @ManyToOne(() => User, (user) => user.sessions)
    @JoinColumn({ name: 'userId' })
    user: Awaited<User>;
}
