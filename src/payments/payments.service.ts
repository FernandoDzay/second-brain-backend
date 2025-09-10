import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOperator, In, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { FindAllPaymentsDto } from './dto/find-all-payments.dto';
import { Tag } from 'src/tags/entities/tag.entity';
import { unrelatePaymentsDto } from './dto/unrelate-payments.dto';
import { endOfMonth, startOfMonth } from 'date-fns';
import { dateToString, round } from 'src/common/formatters';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
        @InjectRepository(Tag) private tagsRepository: Repository<Tag>,
    ) {}

    async create(userId: string, createPaymentDto: CreatePaymentDto) {
        let tags: Tag[] = [];
        if (createPaymentDto.tagIds) {
            tags = await this.tagsRepository.find({ where: { id: In(createPaymentDto.tagIds) } });
        }

        let amount: number;
        if (createPaymentDto.amountType === 'income') amount = Math.abs(createPaymentDto.amount);
        else amount = -Math.abs(createPaymentDto.amount);
        return this.paymentRepository.save({ ...createPaymentDto, amount, tags, userId });
    }

    findAll(userId: string, filters?: FindAllPaymentsDto) {
        const description = filters?.description ? Like(filters.description) : undefined;
        let amount: FindOperator<number> | undefined = undefined;
        let createdAt: FindOperator<Date> | undefined = undefined;

        if (filters?.amountStart !== undefined && filters?.amountEnd !== undefined) {
            amount = Between(filters.amountStart, filters.amountEnd);
        } else if (filters?.amountStart !== undefined) {
            amount = MoreThanOrEqual(filters.amountStart);
        } else if (filters?.amountEnd !== undefined) {
            amount = MoreThanOrEqual(filters.amountEnd);
        }

        if (filters?.createdAtStart !== undefined && filters?.createdAtEnd !== undefined) {
            createdAt = Between(filters.createdAtStart, filters.createdAtEnd);
        } else if (filters?.createdAtStart !== undefined) {
            createdAt = MoreThanOrEqual(filters.createdAtStart);
        } else if (filters?.createdAtEnd !== undefined) {
            createdAt = MoreThanOrEqual(filters.createdAtEnd);
        }

        return this.paymentRepository.find({
            where: {
                userId,
                description,
                amount,
                itIsLoan: filters?.itIsLoan,
                createdAt,
                tags: filters?.tags !== undefined ? { id: In(filters.tags) } : undefined,
            },
            order: {
                date: { direction: 'DESC' },
            },
            relations: { tags: true },
        });
    }

    findOne(userId: string, id: number) {
        return this.paymentRepository.findOne({
            where: { id, userId },
            relations: { tags: true, payments: true },
        });
    }

    async update(userId: string, id: number, updatePaymentDto: UpdatePaymentDto) {
        const payment = await this.paymentRepository.findOne({
            where: { id, userId },
            relations: { tags: true },
        });
        if (!payment) throw new NotFoundException();

        let tags = payment.tags;
        if (updatePaymentDto.tagIds) {
            tags = await this.tagsRepository.find({ where: { id: In(updatePaymentDto.tagIds) } });
        }

        let amount = payment.amount;
        if (updatePaymentDto.amountType && updatePaymentDto.amount) {
            if (updatePaymentDto.amountType === 'income')
                amount = Math.abs(updatePaymentDto.amount);
            else amount = -Math.abs(updatePaymentDto.amount);
        }

        return this.paymentRepository.save({ ...payment, ...updatePaymentDto, amount, tags });
    }

    async remove(userId: string, id: number) {
        const payment = await this.paymentRepository.findOneBy({ id, userId });
        if (!payment) throw new NotFoundException();
        return this.paymentRepository.delete(id);
    }

    async relatePayments(userId: string, paymentIds: number[]) {
        const payments = await this.paymentRepository.find({
            where: { id: In(paymentIds), userId },
            relations: { payments: true },
        });

        // Map para acceso rápido a los IDs ya relacionados
        const paymentsMap = new Map<number, Set<number>>();
        for (const payment of payments) {
            paymentsMap.set(payment.id, new Set(payment.payments?.map((p) => p.id) ?? []));
        }

        // Arreglo de pagos a actualizar
        const updates: typeof payments = [];

        for (const paymentI of payments) {
            for (const paymentJ of payments) {
                if (paymentI.id === paymentJ.id) continue;
                if (paymentsMap.get(paymentI.id)!.has(paymentJ.id)) continue;

                paymentI.payments!.push(paymentJ);
                paymentsMap.get(paymentI.id)!.add(paymentJ.id);

                if (!updates.includes(paymentI)) {
                    updates.push(paymentI);
                }
            }
        }

        if (updates.length > 0) {
            await this.paymentRepository.save(updates);
        }
    }

    async unrelatePayments(userId: string, { paymentId_1, paymentId_2 }: unrelatePaymentsDto) {
        const [payment1, payment2] = await Promise.all([
            this.paymentRepository.findOne({
                where: { id: paymentId_1, userId },
                relations: { payments: true },
            }),
            this.paymentRepository.findOne({
                where: { id: paymentId_2, userId },
                relations: { payments: true },
            }),
        ]);

        if (!payment1 || !payment2) {
            throw new NotFoundException('Uno o ambos pagos no existen o no pertenecen al usuario');
        }

        payment1.payments = (payment1.payments ?? []).filter((p) => p.id !== paymentId_2);
        payment2.payments = (payment2.payments ?? []).filter((p) => p.id !== paymentId_1);

        await this.paymentRepository.save([payment1, payment2]);
    }

    async getMonthPaymentsSummary(
        userId: string,
        date?: string,
    ): Promise<{
        income: number;
        outgoing: number;
    }> {
        let startDate = startOfMonth(new Date());
        let endDate = endOfMonth(new Date());
        if (date) {
            startDate = startOfMonth(new Date(date));
            endDate = endOfMonth(new Date(date));
        }

        const payments = await this.paymentRepository.find({
            where: {
                userId,
                date: Between(dateToString(startDate), dateToString(endDate)),
            },
            relations: {
                payments: true,
            },
        });

        let income = 0;
        let outgoing = 0;

        payments.forEach((payment) => {
            if (payment.amount > 0) income += payment.amount;
            else outgoing += payment.amount;
        });

        return {
            income: Math.abs(round(income)),
            outgoing: Math.abs(round(outgoing)),
        };
    }
}
