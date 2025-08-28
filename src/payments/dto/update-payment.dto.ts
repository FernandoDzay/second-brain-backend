import { CreatePaymentSchema } from './create-payment.dto';
import { createZodDto } from 'nestjs-zod';

export const UpdatePaymentSchema = CreatePaymentSchema.partial();

export class UpdatePaymentDto extends createZodDto(UpdatePaymentSchema) {}
