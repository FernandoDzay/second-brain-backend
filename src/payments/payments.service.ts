import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOperator, In, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { FindAllPaymentsDto } from './dto/find-all-payments.dto';
import { Tag } from 'src/tags/entities/tag.entity';

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
        return this.paymentRepository.save({ ...createPaymentDto, tags, userId });
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
        });
    }

    findOne(userId: string, id: number) {
        return this.paymentRepository.findOneBy({ id, userId });
    }

    async update(userId: string, id: number, updatePaymentDto: UpdatePaymentDto) {
        const payment = await this.paymentRepository.findOneBy({ id, userId });
        if (!payment) throw new NotFoundException();
        return this.paymentRepository.save({ ...payment, ...updatePaymentDto });
    }

    async remove(userId: string, id: number) {
        const payment = await this.paymentRepository.findOneBy({ id, userId });
        if (!payment) throw new NotFoundException();
        return this.paymentRepository.delete(id);
    }
}
