import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const GetMonthPaymentsSummarySchema = z.object({
    date: z.iso.date().optional(),
});

export class GetMonthPaymentsSummaryDto extends createZodDto(GetMonthPaymentsSummarySchema) {}
