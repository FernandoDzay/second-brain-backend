import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { Task, taskPriority } from '../entities/task.entity';

const orderZType = z.enum(['asc', 'desc']).optional();

export const FindAllTasksSchema = z
    .object({
        priority: z.enum(taskPriority),
        done: z.coerce.boolean(),
        year: z.number(),
        month: z.number(),
        order: z.object({
            priority: orderZType,
            startDate: orderZType,
        }),
    })
    .partial();

export class FindAllTasksDto extends createZodDto(FindAllTasksSchema) {}
