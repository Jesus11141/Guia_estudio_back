import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubjectsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.subject.findMany({
      include: { lessons: true },
    });
  }

  findByGrade(gradeId: string) {
    return this.prisma.subject.findMany({
      where: { gradeId },
      include: { lessons: true },
    });
  }

  create(data: { name: string; gradeId: string }) {
    return this.prisma.subject.create({ data });
  }

  
  update(id: string, data: any) {
    return this.prisma.subject.update({ where: { id }, data });
  }
  async remove(id: string) {
    return this.prisma.subject.delete({ where: { id } });
  }
}
