import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Controller, Post, Get, Body, Param, Delete, Patch } from '@nestjs/common';
import { QuestionsService } from './questions.service';

@UseGuards(JwtAuthGuard)
@Controller('api/questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get('by-type/:type')
  findByType(@Param('type') type: string) {
    return this.questionsService.findByType(type);
  }

  @Post()
  create(@Body() body: any) {
    return this.questionsService.create(body);
  }

  
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.questionsService.update(id, body);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(id);
  }
}
