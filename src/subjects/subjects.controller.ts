import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Controller, Get, Post, Patch, Body, Query, Param, Delete } from '@nestjs/common';
import { SubjectsService } from './subjects.service';

@UseGuards(JwtAuthGuard)
@Controller('api/subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  findAll(@Query('gradeId') gradeId?: string) {
    if (gradeId) {
      return this.subjectsService.findByGrade(gradeId);
    }
    return this.subjectsService.findAll();
  }

  @Post()
  create(@Body() body: { name: string; gradeId: string }) {
    return this.subjectsService.create(body);
  }

  
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.subjectsService.update(id, body);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectsService.remove(id);
  }
}
