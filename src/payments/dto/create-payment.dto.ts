import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreatePaymentSchema = z.object({
    description: z.string().min(3),
    amount: z.coerce.number().gt(0).or(z.coerce.number().lt(0)),
    itIsLoan: z.coerce.boolean(),
    tagIds: z.array(z.coerce.number()).optional(),
});

export class CreatePaymentDto extends createZodDto(CreatePaymentSchema) {}
