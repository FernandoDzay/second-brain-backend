import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('verification')
export class Verification {
    @PrimaryColumn({ type: 'varchar', length: 36 })
    id: string;

    @Column('text')
    identifier: string;

    @Column('text')
    value: string;

    @Column()
    expiresAt: Date;

    @CreateDateColumn({ nullable: true })
    createdAt?: Date;

    @UpdateDateColumn({ nullable: true })
    updatedAt?: Date;
}
