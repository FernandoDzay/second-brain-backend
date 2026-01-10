import { CreateTaskSchema } from './create-task.dto';
import { createZodDto } from 'nestjs-zod';

export const Schema = CreateTaskSchema.partial();

export class UpdateTaskDto extends createZodDto(Schema) {}
