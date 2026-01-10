import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { User } from 'src/auth/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Task, Tag, User])],
    controllers: [TasksController],
    providers: [TasksService],
})
export class TasksModule {}
