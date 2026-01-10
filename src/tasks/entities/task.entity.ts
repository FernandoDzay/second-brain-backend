import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Tag } from 'src/tags/entities/tag.entity';

export const taskPriority = ['1', '2', '3', '4'] as const;
export type TaskPriorityType = (typeof taskPriority)[number];

@Entity({ name: 'tasks' })
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @Column()
    title: string;

    @Column({ type: 'longtext' })
    description: string;

    @Column({ type: 'date', nullable: true })
    startDate: string | null;

    @Column({ type: 'time', nullable: true })
    startTime: string | null;

    @Column({ type: 'date', nullable: true })
    endDate: string | null;

    @Column({ type: 'time', nullable: true })
    endTime: string | null;

    @Column({
        type: 'enum',
        enum: [1, 2, 3, 4],
        default: 1,
    })
    priority: TaskPriorityType;

    @Column({ default: 0 })
    done: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => Tag)
    @JoinTable()
    tags?: Tag[];

    @ManyToOne(() => User, (user) => user.tags)
    user?: User;
}
