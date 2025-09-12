import { createZodDto } from 'nestjs-zod';
import { zodAppBoolean } from 'src/common/zod-helpers';
import { z } from 'zod';

export const FindAllPaymentsSchema = z
    .object({
        description: z.coerce.string(),
        amountStart: z.coerce.number(),
        amountEnd: z.coerce.number(),
        itIsLoan: zodAppBoolean,
        dateStart: z.iso.date(),
        dateEnd: z.iso.date(),
        tags: z.array(z.coerce.number()).or(z.coerce.number()),
    })
    .partial();

export class FindAllPaymentsDto extends createZodDto(FindAllPaymentsSchema) {}
