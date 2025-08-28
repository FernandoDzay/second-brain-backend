import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { availableTags } from '../tags-catalog';

export const CreateTagSchema = z.object({
    category: z.enum(availableTags),
    name: z.string().min(3),
    description: z.string(),
});

export class CreateTagDto extends createZodDto(CreateTagSchema) {}
