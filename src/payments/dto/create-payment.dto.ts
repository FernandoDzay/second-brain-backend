import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreatePaymentSchema = z.object({
    description: z.string().min(3),
    amount: z.coerce
        .number()
        .refine((n) => n !== 0 && !Object.is(n, -0), { message: 'Debe ser distinto de 0' }),
    amountType: z.enum(['income', 'outgoing']),
    itIsLoan: z.coerce.boolean(),
    tagIds: z.array(z.coerce.number()).optional(),
});

export class CreatePaymentDto extends createZodDto(CreatePaymentSchema) {}
