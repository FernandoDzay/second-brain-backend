import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const RelatePaymentsSchema = z.array(z.number());

export class RelatePaymentsDto extends createZodDto(RelatePaymentsSchema) {}
