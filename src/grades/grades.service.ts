import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GradesService {
  constructor(private prisma: PrismaService) {}

  findAll(user: any) {
    if (user.role === 'STUDENT' && !user.gradeId) {
      return []; // If student has no grade assigned, return empty list instead of all grades.
    }
    
    const whereClause = (user.role === 'STUDENT' && user.gradeId) 
        ? { id: user.gradeId } 
        : {};
        
    return this.prisma.grade.findMany({
      where: whereClause,
      include: { subjects: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  findOne(id: string) {
    return this.prisma.grade.findUnique({
      where: { id },
      include: { subjects: true },
    });
  }

  create(data: { name: string; educationLevel: string }) {
    return this.prisma.grade.create({ data });
  }

  
  update(id: string, data: any) {
    return this.prisma.grade.update({ where: { id }, data });
  }
  async remove(id: string) {
    return this.prisma.grade.delete({ where: { id } });
  }
}
