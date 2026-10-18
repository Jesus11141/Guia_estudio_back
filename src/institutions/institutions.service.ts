import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InstitutionsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.institution.findMany({
      orderBy: { name: 'asc' },
    });
  }

  findOne(id: string) {
    return this.prisma.institution.findUnique({
      where: { id },
    });
  }

  create(data: { name: string; logoUrl?: string }) {
    return this.prisma.institution.create({ data });
  }

  update(id: string, data: { name?: string; logoUrl?: string }) {
    return this.prisma.institution.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.institution.delete({ where: { id } });
  }
}
