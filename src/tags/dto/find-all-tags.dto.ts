import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { availableTags } from '../tags-catalog';

export const FindAllTagsSchema = z
    .object({
        category: z.enum(availableTags),
        name: z.string(),
        description: z.string(),
    })
    .partial();

export class FindAllTagsDto extends createZodDto(FindAllTagsSchema) {}
