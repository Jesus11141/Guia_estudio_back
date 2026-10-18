import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScoreDto } from './dto/create-score.dto';

@Injectable()
export class ScoresService {
  constructor(private readonly prisma: PrismaService) {}

  async upsertScore(userId: string, data: CreateScoreDto) {
    // We use a transaction so stars and scores update together
    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.score.findUnique({
        where: {
          userId_lessonId: { userId, lessonId: data.lessonId },
        },
      });

      let starsToAward = 0;
      let finalScore;

      if (existing) {
        if (data.score > existing.score) {
          starsToAward = data.score - existing.score;
          finalScore = await tx.score.update({
            where: { id: existing.id },
            data: { score: data.score, totalQuestions: data.totalQuestions },
          });
        } else {
          finalScore = existing;
        }
      } else {
        starsToAward = data.score;
        finalScore = await tx.score.create({
          data: {
            userId,
            lessonId: data.lessonId,
            score: data.score,
            totalQuestions: data.totalQuestions,
          },
        });
      }

      if (starsToAward > 0) {
        await tx.user.update({
          where: { id: userId },
          data: { stars: { increment: starsToAward } },
        });
      }

      return finalScore;
    });
  }

  async findAll(gradeId?: string, institutionId?: string) {
    const whereClause: any = {};
    if (gradeId || institutionId) {
      whereClause.user = {};
      if (gradeId) whereClause.user.gradeId = gradeId;
      if (institutionId) whereClause.user.institutionId = institutionId;
    }

    return this.prisma.score.findMany({
      where: whereClause,
      include: {
        user: { select: { name: true, email: true, grade: { select: { name: true } } } },
        lesson: { select: { title: true, subject: { select: { name: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
