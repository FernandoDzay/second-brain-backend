import { CreateTagSchema } from './create-tag.dto';
import { createZodDto } from 'nestjs-zod';

export const UpdateTagSchema = CreateTagSchema.partial();

export class UpdateTagDto extends createZodDto(UpdateTagSchema) {}
