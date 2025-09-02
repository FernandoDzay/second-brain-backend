import { User } from 'src/auth/entities/user.entity';
import { DecimalColumnTransformer } from 'src/common/DecimalColumnTransformer';
import { Tag } from 'src/tags/entities/tag.entity';
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

@Entity({ name: 'payments' })
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @Column()
    description: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0,
        transformer: new DecimalColumnTransformer(),
    })
    amount: number;

    @Column({ type: 'boolean' })
    itIsLoan: boolean;

    @Column({ type: 'date' })
    date: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.payments)
    user?: User;

    @ManyToMany(() => Tag)
    @JoinTable()
    tags?: Tag[];

    @ManyToMany(() => Payment)
    @JoinTable()
    payments?: Payment[];
}
