import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request,
    Query,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { AuthGuard, Session, UserSession } from '@thallesp/nestjs-better-auth';
import { FindAllTagsDto } from './dto/find-all-tags.dto';

@Controller('tags')
@UseGuards(AuthGuard)
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @Post()
    create(@Body() createTagDto: CreateTagDto, @Session() session: UserSession) {
        return this.tagsService.create(session.user.id, createTagDto);
    }

    @Get()
    findAll(@Query() findAllTagDto: FindAllTagsDto, @Session() session: UserSession) {
        return this.tagsService.findAll(session.user.id, findAllTagDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Session() session: UserSession) {
        return this.tagsService.findOne(session.user.id, +id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateTagDto: UpdateTagDto,
        @Session() session: UserSession,
    ) {
        return this.tagsService.update(session.user.id, +id, updateTagDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Session() session: UserSession) {
        return this.tagsService.remove(session.user.id, +id);
    }
}
