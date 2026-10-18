import { UseGuards, ForbiddenException, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Controller, Get, Post, Patch, Body, Param, Put, Delete } from '@nestjs/common';
import { InstitutionsService } from './institutions.service';

@UseGuards(JwtAuthGuard)
@Controller('api/institutions')
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) {}

  @Get()
  findAll() {
    return this.institutionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.institutionsService.findOne(id);
  }

  @Post()
  create(@Req() req: any, @Body() body: any) {
    if (req.user.role !== 'SUPER_ADMIN') throw new ForbiddenException();
    return this.institutionsService.create(body);
  }

  @Put(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() body: any) {
    if (req.user.role !== 'SUPER_ADMIN') throw new ForbiddenException();
    return this.institutionsService.update(id, body);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    if (req.user.role !== 'SUPER_ADMIN') throw new ForbiddenException();
    return this.institutionsService.remove(id);
  }
}
