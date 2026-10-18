import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';

@Injectable()
export class LessonsService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async findBySubject(subjectId: string) {
    return this.prisma.lesson.findMany({
      where: { subjectId },
      orderBy: { orderIndex: 'asc' },
    });
  }

  getQuestions(lessonId: string) {
    return this.prisma.question.findMany({
      where: { lessonId },
    });
  }

  async create(data: { title: string; content: string; subjectId: string }) {
    const total = await this.prisma.lesson.count({ where: { subjectId: data.subjectId } });
    const lesson = await this.prisma.lesson.create({
      data: {
        title: data.title,
        content: data.content,
        subjectId: data.subjectId,
        orderIndex: total + 1,
      },
      include: { subject: { include: { grade: true } } },
    });

    // ─── RAG: Auto-index the lesson into AI knowledge base ───────────────
    try {
      this.aiService.indexLesson(
        lesson.id,
        lesson.title,
        lesson.content || '',
        lesson.subject?.name || '',
        lesson.subject?.grade?.name || '',
      );
    } catch (_) {}

    return lesson;
  }

  async update(id: string, data: any) {
    const lesson = await this.prisma.lesson.update({
      where: { id },
      data,
      include: { subject: { include: { grade: true } } },
    });

    // ─── RAG: Re-index updated lesson ────────────────────────────────────
    try {
      this.aiService.indexLesson(
        lesson.id,
        lesson.title,
        lesson.content || '',
        lesson.subject?.name || '',
        lesson.subject?.grade?.name || '',
      );
    } catch (_) {}

    return lesson;
  }

  async remove(id: string) {
    // ─── RAG: Remove from knowledge base ─────────────────────────────────
    try {
      this.aiService.removeLesson(id);
    } catch (_) {}
    return this.prisma.lesson.delete({ where: { id } });
  }
}
