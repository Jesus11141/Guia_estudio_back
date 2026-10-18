import { Controller, Post, Get, Body, Query, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { Request } from 'express';

@Controller('scores')
@UseGuards(JwtAuthGuard)
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Post()
  async saveScore(@Req() req: Request, @Body() createScoreDto: CreateScoreDto) {
    const userId = (req.user as any).id;
    return this.scoresService.upsertScore(userId, createScoreDto);
  }

  @Get()
  async getScores(@Req() req: Request, @Query('gradeId') gradeId?: string) {
    const user = req.user as any;
    if (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
      throw new ForbiddenException('No tienes permisos para ver las calificaciones.');
    }
    const institutionId = user.role === 'ADMIN' ? user.institutionId : undefined;
    return this.scoresService.findAll(gradeId, institutionId);
  }
}
