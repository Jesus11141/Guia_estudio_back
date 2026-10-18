import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: any, fileUrl: string) {
    return this.prisma.book.create({
      data: {
        title: createBookDto.title,
        author: createBookDto.author,
        description: createBookDto.description,
        category: (createBookDto.category && createBookDto.category.trim()) ? createBookDto.category.trim() : 'General',
        institutionId: createBookDto.institutionId || null,
        fileUrl,
      },
    });
  }

  async findAll(institutionId?: string) {
    return this.prisma.book.findMany({
      where: institutionId ? {
        OR: [
          { institutionId },
          { institutionId: null } // Libros globales
        ]
      } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) throw new NotFoundException('Libro no encontrado');
    return book;
  }

  async getCategories(institutionId?: string) {
    const books = await this.prisma.book.findMany({
      where: institutionId ? {
        OR: [
          { institutionId },
          { institutionId: null }
        ]
      } : undefined,
      select: { category: true },
      distinct: ['category'],
    });
    return books
      .map((b) => b.category)
      .filter((c): c is string => typeof c === 'string' && c.trim().length > 0);
  }

  async update(id: string, updateBookDto: any, fileUrl?: string) {
    const data: any = { ...updateBookDto };
    if (fileUrl) {
      data.fileUrl = fileUrl;
    }
    if (data.category !== undefined) {
      data.category = (data.category && data.category.trim()) ? data.category.trim() : 'General';
    }
    return this.prisma.book.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.book.delete({ where: { id } });
  }
}
