import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const FindAllPaymentsSchema = z
    .object({
        description: z.coerce.string(),
        amountStart: z.coerce.number(),
        amountEnd: z.coerce.number(),
        itIsLoan: z.coerce.boolean(),
        createdAtStart: z.coerce.date(),
        createdAtEnd: z.coerce.date(),
        tags: z.array(z.coerce.number()),
    })
    .partial();

export class FindAllPaymentsDto extends createZodDto(FindAllPaymentsSchema) {}
