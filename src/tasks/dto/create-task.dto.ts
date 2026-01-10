import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { taskPriority } from '../entities/task.entity';

export const CreateTaskSchema = z.object({
    title: z.string().min(1),
    description: z.string(),
    startDate: z.iso.date().nullish(),
    startTime: z.iso.time().nullish(),
    endDate: z.iso.date().nullish(),
    endTime: z.iso.time().nullish(),
    priority: z.enum(taskPriority),
    done: z.coerce.boolean(),
    tagIds: z.array(z.coerce.number()).optional(),
});

export class CreateTaskDto extends createZodDto(CreateTaskSchema) {}
