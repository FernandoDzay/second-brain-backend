import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AvailableTagsType } from '../tags-catalog';
import { User } from 'src/auth/entities/user.entity';

@Entity({ name: 'tags' })
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @Column({ length: 50 })
    category: AvailableTagsType;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => User, (user) => user.tags)
    user?: User;
}
