import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request,
    Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard, Session, UserSession } from '@thallesp/nestjs-better-auth';
import { TaskPriorityType } from './entities/task.entity';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    create(@Body() createTaskDto: CreateTaskDto, @Session() session: UserSession) {
        return this.tasksService.create(session.user.id, createTaskDto);
    }

    @Get()
    findAll(
        @Query() findAllTaskDto: { done?: boolean; category?: TaskPriorityType },
        @Session() session: UserSession,
    ) {
        return this.tasksService.findAll(session.user.id, findAllTaskDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Session() session: UserSession) {
        return this.tasksService.findOne(session.user.id, +id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto,
        @Session() session: UserSession,
    ) {
        return this.tasksService.update(session.user.id, +id, updateTaskDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Session() session: UserSession) {
        return this.tasksService.remove(session.user.id, +id);
    }
}
