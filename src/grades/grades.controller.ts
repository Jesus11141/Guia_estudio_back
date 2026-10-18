import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Controller, Get, Post, Patch, Body, Param, Delete, Request } from '@nestjs/common';
import { GradesService } from './grades.service';

@UseGuards(JwtAuthGuard)
@Controller('api/grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Get()
  findAll(@Request() req: any) {
    return this.gradesService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gradesService.findOne(id);
  }

  @Post()
  create(@Body() body: { name: string; educationLevel: string }) {
    return this.gradesService.create(body);
  }

  
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.gradesService.update(id, body);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gradesService.remove(id);
  }
}
