import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const unrelatePaymentsSchema = z.object({
    paymentId_1: z.number(),
    paymentId_2: z.number(),
});

export class unrelatePaymentsDto extends createZodDto(unrelatePaymentsSchema) {}
