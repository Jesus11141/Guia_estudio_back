import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Controller, Get, Post, Patch, Body, Query, Param, Delete } from '@nestjs/common';
import { LessonsService } from './lessons.service';

@UseGuards(JwtAuthGuard)
@Controller('api/lessons')
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}

  @Get()
  findBySubject(@Query('subjectId') subjectId: string) {
    return this.lessonsService.findBySubject(subjectId);
  }

  @Get(':id/questions')
  getQuestions(@Param('id') id: string) {
    return this.lessonsService.getQuestions(id);
  }

  @Post()
  create(@Body() body: { title: string; content: string; subjectId: string }) {
    return this.lessonsService.create(body);
  }

  
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.lessonsService.update(id, body);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(id);
  }
}
