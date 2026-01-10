import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskPriorityType } from './entities/task.entity';
import { Between, FindOperator, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { endOfMonth, format, getMonth, getYear, startOfMonth } from 'date-fns';
import { FindAllTasksDto } from './dto/find-all-tasks.dto';
import { dateToString } from 'src/common/formatters';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {}

    create(userId: string, createTaskDto: CreateTaskDto) {
        return this.taskRepository.insert({ ...createTaskDto, userId });
    }

    findAll(userId: string, filters?: FindAllTasksDto) {
        let year = getYear(new Date());
        let month = getMonth(new Date());

        if (filters?.year) year = filters.year;
        if (filters?.month) month = filters.month;

        const startDateString = `${year}-${month}-01`;
        const endDateString = dateToString(endOfMonth(new Date(year, month, 1)));
        let startDate: FindOperator<string> | undefined = undefined;
        if (filters?.month) {
            startDate = Between(startDateString, endDateString);
            console.log(startDateString, endDateString);
        }

        return this.taskRepository.find({
            where: {
                priority: filters?.priority,
                done: filters?.done,
                startDate,
                userId,
            },
            order: { startDate: 'desc', startTime: 'desc', priority: 'desc' },
        });
    }

    findOne(userId: string, id: number) {
        return this.taskRepository.findOneBy({ id, userId });
    }

    async update(userId: string, id: number, updateTaskDto: UpdateTaskDto) {
        const task = await this.taskRepository.findOneBy({ id, userId });
        if (!task) throw new NotFoundException();
        return this.taskRepository.save({ ...task, ...updateTaskDto });
    }

    async remove(userId: string, id: number) {
        const task = await this.taskRepository.findOneBy({ id, userId });
        if (!task) throw new NotFoundException();
        return this.taskRepository.delete(id);
    }
}
