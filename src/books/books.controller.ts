import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Req, BadRequestException, ForbiddenException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BooksService } from './books.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('api/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/books',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
      },
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype === 'application/pdf' || file.mimetype === 'application/epub+zip') {
        cb(null, true);
      } else {
        cb(new BadRequestException('Solo se permiten archivos PDF o EPUB'), false);
      }
    },
  }))
  create(@Body() createBookDto: any, @UploadedFile() file: Express.Multer.File, @Req() req: any) {
    if (req.user.role !== 'SUPER_ADMIN' && req.user.role !== 'ADMIN') {
      throw new ForbiddenException();
    }
    if (!file) throw new BadRequestException('El archivo es requerido');
    
    if (req.user.role === 'ADMIN' && req.user.institutionId) {
      createBookDto.institutionId = req.user.institutionId;
    }

    const fileUrl = `/uploads/books/${file.filename}`;
    return this.booksService.create(createBookDto, fileUrl);
  }

  @Get()
  findAll(@Req() req: any) {
    if (req.user.role !== 'SUPER_ADMIN') {
      return this.booksService.findAll(req.user.institutionId);
    }
    return this.booksService.findAll();
  }

  @Get('categories')
  getCategories(@Req() req: any) {
    const instId = req.user.role !== 'SUPER_ADMIN' ? req.user.institutionId : undefined;
    return this.booksService.getCategories(instId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/books',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
      },
    }),
  }))
  async update(@Param('id') id: string, @Body() updateBookDto: any, @UploadedFile() file: Express.Multer.File, @Req() req: any) {
    if (req.user.role !== 'SUPER_ADMIN' && req.user.role !== 'ADMIN') {
      throw new ForbiddenException();
    }
    if (req.user.role === 'ADMIN') {
      const book = await this.booksService.findOne(id);
      if (book.institutionId !== req.user.institutionId) {
        throw new ForbiddenException('No tienes permisos para editar este libro.');
      }
    }
    let fileUrl = undefined;
    if (file) {
      fileUrl = `/uploads/books/${file.filename}`;
    }
    return this.booksService.update(id, updateBookDto, fileUrl);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: any) {
    if (req.user.role !== 'SUPER_ADMIN' && req.user.role !== 'ADMIN') {
      throw new ForbiddenException();
    }
    if (req.user.role === 'ADMIN') {
      const book = await this.booksService.findOne(id);
      if (book.institutionId !== req.user.institutionId) {
        throw new ForbiddenException('No tienes permisos para eliminar este libro.');
      }
    }
    return this.booksService.remove(id);
  }
}
