import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllTagsDto } from './dto/find-all-tags.dto';

@Injectable()
export class TagsService {
    constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) {}

    create(userId: string, createTagDto: CreateTagDto) {
        return this.tagRepository.insert({ ...createTagDto, userId });
    }

    findAll(userId: string, filters?: FindAllTagsDto) {
        return this.tagRepository.findBy({ ...filters, userId });
    }

    findOne(userId: string, id: number) {
        return this.tagRepository.findOneBy({ id, userId });
    }

    async update(userId: string, id: number, updateTagDto: UpdateTagDto) {
        const tag = await this.tagRepository.findOneBy({ id, userId });
        if (!tag) throw new NotFoundException();
        return this.tagRepository.save({ ...tag, ...updateTagDto });
    }

    async remove(userId: string, id: number) {
        const tag = await this.tagRepository.findOneBy({ id, userId });
        if (!tag) throw new NotFoundException();
        return this.tagRepository.delete(id);
    }
}
