import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { AuthGuard, Session, UserSession } from '@thallesp/nestjs-better-auth';
import { FindAllPaymentsDto } from './dto/find-all-payments.dto';
import { RelatePaymentsDto } from './dto/relate-payments.dto';
import { unrelatePaymentsDto } from './dto/unrelate-payments.dto';

@Controller('payments')
@UseGuards(AuthGuard)
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}

    @Post()
    create(@Body() createPaymentDto: CreatePaymentDto, @Session() session: UserSession) {
        return this.paymentsService.create(session.user.id, createPaymentDto);
    }

    @Get()
    findAll(@Query() findAllPaymentDto: FindAllPaymentsDto, @Session() session: UserSession) {
        return this.paymentsService.findAll(session.user.id, findAllPaymentDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Session() session: UserSession) {
        return this.paymentsService.findOne(session.user.id, +id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updatePaymentDto: UpdatePaymentDto,
        @Session() session: UserSession,
    ) {
        return this.paymentsService.update(session.user.id, +id, updatePaymentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Session() session: UserSession) {
        return this.paymentsService.remove(session.user.id, +id);
    }

    @Post('relate-payments')
    async relatePayments(
        @Body() relatePaymentsDto: RelatePaymentsDto,
        @Session() session: UserSession,
    ) {
        await this.paymentsService.relatePayments(session.user.id, relatePaymentsDto);
        return {};
    }

    @Post('unrelate-payments')
    async unrelatePayments(
        @Body() unrelatePaymentsDto: unrelatePaymentsDto,
        @Session() session: UserSession,
    ) {
        await this.paymentsService.unrelatePayments(session.user.id, unrelatePaymentsDto);
        return {};
    }
}
