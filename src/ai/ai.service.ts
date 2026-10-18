import { Injectable, InternalServerErrorException, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import * as https from 'https';

export interface QuizQuestion {
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
  explanation: string;
}

interface KnowledgeEntry {
  title: string;
  content: string;
  subject: string;
  grade: string;
}

@Injectable()
export class AiService implements OnModuleInit {
  private readonly logger = new Logger(AiService.name);
  private readonly apiKey: string;
  private readonly model = 'gemini-3.1-flash-lite';
  // In-memory knowledge base for RAG: lessonId -> content
  private readonly knowledgeBase: Map<string, KnowledgeEntry> = new Map();

  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
  ) {
    this.apiKey = this.config.get<string>('GEMINI_API_KEY') || '';
    if (!this.apiKey) {
      this.logger.warn('GEMINI_API_KEY not set. AI features will not work.');
    }
  }

  async onModuleInit() {
    await this.reindexAll();
  }

  async reindexAll(): Promise<number> {
    try {
      const lessons = await this.prisma.lesson.findMany({
        include: { subject: { include: { grade: true } } },
      });
      this.knowledgeBase.clear();
      for (const lesson of lessons) {
        this.indexLesson(
          lesson.id,
          lesson.title,
          lesson.content || '',
          lesson.subject?.name || 'General',
          lesson.subject?.grade?.name || 'General',
        );
      }
      this.logger.log(`RAG: Auto-indexed ${this.knowledgeBase.size} lessons into knowledge base.`);
      return this.knowledgeBase.size;
    } catch (e: any) {
      this.logger.error('Failed to reindex lessons for RAG:', e?.message);
      return 0;
    }
  }

  // ─── RAG: Index a lesson into the knowledge base ──────────────────────────
  indexLesson(lessonId: string, title: string, content: string, subject: string, grade: string) {
    this.knowledgeBase.set(lessonId, { title, content, subject, grade });
    this.logger.log(`RAG: Indexed lesson "${title}" (${lessonId})`);
  }

  removeLesson(lessonId: string) {
    this.knowledgeBase.delete(lessonId);
  }

  // ─── RAG: Keyword search in knowledge base ─────────────────────────────────
  private searchKnowledge(query: string, limit = 3): string {
    const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const results: Array<{ score: number; entry: KnowledgeEntry }> = [];

    for (const entry of this.knowledgeBase.values()) {
      const haystack = `${entry.title} ${entry.content} ${entry.subject} ${entry.grade}`.toLowerCase();
      let score = 0;
      for (const word of queryWords) {
        const count = (haystack.match(new RegExp(word, 'g')) || []).length;
        score += count;
      }
      if (score > 0) results.push({ score, entry });
    }

    results.sort((a, b) => b.score - a.score);

    return results
      .slice(0, limit)
      .map(r => `=== "${r.entry.title}" (${r.entry.subject} - ${r.entry.grade}) ===\n${r.entry.content || ''}`)
      .join('\n\n');
  }

  // ─── Core: Call Gemini API ─────────────────────────────────────────────────
  private callGemini(prompt: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.apiKey) return reject(new Error('GEMINI_API_KEY not configured'));

      const body = JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
      });

      const req = https.request(
        `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(body),
          },
        },
        (res) => {
          let data = '';
          res.on('data', chunk => (data += chunk));
          res.on('end', () => {
            try {
              const json = JSON.parse(data);
              if (json.error) return reject(new Error(json.error.message));
              const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
              if (!text) return reject(new Error('Empty response from Gemini'));
              resolve(text);
            } catch (e) {
              reject(new Error('Failed to parse Gemini response'));
            }
          });
        },
      );
      req.on('error', reject);
      req.write(body);
      req.end();
    });
  }

  // ─── Feature 1: Generate Quiz with AI (for teachers) ──────────────────────
  async generateQuiz(params: {
    topic: string;
    grade: string;
    subject: string;
    count: number;
    lessonId?: string;
  }): Promise<QuizQuestion[]> {
    let ragContext = '';
    if (params.lessonId) {
      const entry = this.knowledgeBase.get(params.lessonId);
      if (entry) {
        ragContext = `\n\nBasa las preguntas en el siguiente contenido de la lección:\n---\n${entry.content}\n---\n`;
      }
    }
    if (!ragContext) {
      const found = this.searchKnowledge(`${params.topic} ${params.subject} ${params.grade}`);
      if (found) ragContext = `\n\nUsa el siguiente contenido como referencia:\n---\n${found}\n---\n`;
    }

    const prompt = `Eres un experto en educación primaria y secundaria. Crea exactamente ${params.count} preguntas de opción múltiple sobre el tema: "${params.topic}" para estudiantes de ${params.grade} en la materia de ${params.subject}.
${ragContext}
REGLAS:
- Lenguaje claro y apropiado para niños/jóvenes de ese grado.
- Cada pregunta tiene 4 opciones (A, B, C, D) y solo UNA correcta.
- Incluye una breve explicación de por qué la respuesta es correcta.
- Varía la dificultad: algunas fáciles, otras intermedias.

Responde ÚNICAMENTE con un JSON válido, sin texto adicional, con este formato exacto:
[
  {
    "questionText": "¿Pregunta aquí?",
    "optionA": "Opción A",
    "optionB": "Opción B",
    "optionC": "Opción C",
    "optionD": "Opción D",
    "correctOption": "A",
    "explanation": "Breve explicación de la respuesta correcta."
  }
]`;

    try {
      const raw = await this.callGemini(prompt);
      const jsonMatch = raw.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error('No JSON array found in response');
      const questions: QuizQuestion[] = JSON.parse(jsonMatch[0]);
      return questions.slice(0, params.count);
    } catch (e) {
      this.logger.error('Quiz generation failed:', e.message);
      throw new InternalServerErrorException(`Error generando quiz: ${e.message}`);
    }
  }

  // ─── Feature 2: Student AI Tutor with RAG ──────────────────────────────────
  async askTutor(params: {
    question: string;
    lessonContent?: string;
    studentName?: string;
  }): Promise<string> {
    const ragContent = params.lessonContent || this.searchKnowledge(params.question);
    const contextBlock = ragContent
      ? `\n\nCONTENIDO DE LA LECCIÓN:\n---\n${ragContent}\n---`
      : '';
    const studentName = params.studentName || 'estudiante';

    const prompt = `Eres un tutor educativo amigable, paciente y motivador para niños y jóvenes en Latinoamérica. Tu nombre es Profe IA. 🎓
${contextBlock}

El estudiante ${studentName} te pregunta: "${params.question}"

INSTRUCCIONES:
- Usa lenguaje simple, cálido y alentador, apropiado para niños/jóvenes.
- Si hay contenido de lección disponible, basa tu respuesta en ese material.
- Usa emojis y ejemplos concretos de la vida cotidiana.
- Máximo 3-4 párrafos cortos. Sin lenguaje técnico complejo.
- Termina con una frase motivadora o una pregunta para reflexionar.`;

    try {
      return await this.callGemini(prompt);
    } catch (e) {
      this.logger.error('Tutor AI failed:', e.message);
      throw new InternalServerErrorException(`Error del tutor IA: ${e.message}`);
    }
  }

  // ─── Feature 3: Explain a wrong answer ────────────────────────────────────
  async explainAnswer(params: {
    questionText: string;
    correctText: string;
    explanation: string;
  }): Promise<string> {
    const prompt = `Eres un tutor educativo amigable. Un estudiante respondió incorrectamente.

Pregunta: "${params.questionText}"
Respuesta correcta: "${params.correctText}"
Explicación oficial: "${params.explanation}"

Explícale de manera muy amigable, sin hacerlo sentir mal, por qué la respuesta correcta es la correcta. Usa máximo 2 párrafos cortos y termina con un emoji alentador.`;

    try {
      return await this.callGemini(prompt);
    } catch (e) {
      throw new InternalServerErrorException(`Error explicando respuesta: ${e.message}`);
    }
  }

  // ─── Knowledge Base Stats ──────────────────────────────────────────────────
  getKnowledgeBaseStats() {
    return {
      totalLessons: this.knowledgeBase.size,
      lessons: Array.from(this.knowledgeBase.entries()).map(([id, data]) => ({
        id,
        title: data.title,
        subject: data.subject,
        grade: data.grade,
        hasContent: !!data.content,
      })),
    };
  }
}
