import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  create(data: {
    lessonId?: string;
    type?: string;
    metadata?: any;
    questionText: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctOption: string;
    explanation?: string;
  }) {
    return this.prisma.question.create({ data });
  }

  
  findByType(type: string) {
    return this.prisma.question.findMany({
      where: { type },
      orderBy: { createdAt: 'desc' },
    });
  }

  update(id: string, data: any) {
    return this.prisma.question.update({ where: { id }, data });
  }
  remove(id: string) {
    return this.prisma.question.delete({ where: { id } });
  }
}
