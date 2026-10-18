import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AiService } from './ai.service';

@UseGuards(JwtAuthGuard)
@Controller('api/ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  // ─── POST /api/ai/generate-quiz ─────────────────────────────────────────
  // For teachers: Generate a quiz automatically with Gemini AI + RAG
  @Post('generate-quiz')
  async generateQuiz(
    @Req() req: any,
    @Body() body: {
      topic: string;
      grade: string;
      subject: string;
      count?: number;
      lessonId?: string;
    },
  ) {
    if (!['ADMIN', 'SUPER_ADMIN'].includes(req.user.role)) {
      return { error: 'Solo los profesores pueden generar quizzes con IA.' };
    }
    const questions = await this.aiService.generateQuiz({
      topic: body.topic,
      grade: body.grade,
      subject: body.subject,
      count: Math.min(body.count || 5, 10),
      lessonId: body.lessonId,
    });
    return { questions };
  }

  // ─── POST /api/ai/tutor ──────────────────────────────────────────────────
  // For students: Ask the AI tutor a question (with RAG from lesson content)
  @Post('tutor')
  async askTutor(
    @Req() req: any,
    @Body() body: {
      question: string;
      lessonContent?: string;
    },
  ) {
    const answer = await this.aiService.askTutor({
      question: body.question,
      lessonContent: body.lessonContent,
      studentName: req.user.name || req.user.email,
    });
    return { answer };
  }

  // ─── POST /api/ai/explain-answer ─────────────────────────────────────────
  // For students: Get a friendly explanation when they answer incorrectly
  @Post('explain-answer')
  async explainAnswer(
    @Body() body: {
      questionText: string;
      correctText: string;
      explanation: string;
    },
  ) {
    const answer = await this.aiService.explainAnswer(body);
    return { answer };
  }

  // ─── POST /api/ai/index-lesson ────────────────────────────────────────────
  // Auto-indexing endpoint (called internally when lessons are created/updated)
  @Post('index-lesson')
  async indexLesson(
    @Req() req: any,
    @Body() body: {
      lessonId: string;
      title: string;
      content: string;
      subject: string;
      grade: string;
    },
  ) {
    if (!['ADMIN', 'SUPER_ADMIN'].includes(req.user.role)) {
      return { error: 'Sin permisos.' };
    }
    this.aiService.indexLesson(body.lessonId, body.title, body.content, body.subject, body.grade);
    return { success: true, message: `Lección "${body.title}" indexada en la base de conocimiento.` };
  }

  // ─── POST /api/ai/reindex-all ───────────────────────────────────────────
  // For admins: Force re-indexing of all database lessons into RAG
  @Post('reindex-all')
  async reindexAll(@Req() req: any) {
    if (!['ADMIN', 'SUPER_ADMIN'].includes(req.user.role)) {
      return { error: 'Sin permisos.' };
    }
    const count = await this.aiService.reindexAll();
    return { success: true, count, message: `${count} lecciones indexadas exitosamente.` };
  }

  // ─── GET /api/ai/knowledge-stats ─────────────────────────────────────────
  // For admins: See how many lessons are indexed
  @Get('knowledge-stats')
  getStats(@Req() req: any) {
    if (!['ADMIN', 'SUPER_ADMIN'].includes(req.user.role)) {
      return { error: 'Sin permisos.' };
    }
    return this.aiService.getKnowledgeBaseStats();
  }
}
