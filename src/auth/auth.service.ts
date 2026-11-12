import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async getPublicGrades() {
    return this.prisma.grade.findMany({
      select: { id: true, name: true, educationLevel: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  async register(data: {
    email: string;
    pass: string;
    name?: string;
    gradeId?: string;
    hasGames?: boolean;
  }) {
    if (!data.email || !data.pass) {
      throw new BadRequestException('El correo y la contraseña son requeridos');
    }

    const cleanEmail = data.email.trim().toLowerCase();
    const existing = await this.prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existing) {
      throw new BadRequestException('Este correo electrónico ya está registrado. Por favor inicia sesión.');
    }

    const hashedPassword = await bcrypt.hash(data.pass, 10);
    const user = await this.prisma.user.create({
      data: {
        email: cleanEmail,
        password: hashedPassword,
        name: data.name ? data.name.trim() : null,
        role: Role.STUDENT,
        gradeId: data.gradeId || null,
        hasGames: data.hasGames !== undefined ? data.hasGames : true,
      },
      include: { institution: true },
    });

    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      institutionId: user.institutionId,
      gradeId: user.gradeId,
    };
    const { password, ...userData } = user;

    return {
      access_token: this.jwtService.sign(payload),
      user: userData,
    };
  }

  async login(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({ 
      where: { email },
      include: { institution: true }
    });
    
    if (!user) {
      throw new UnauthorizedException('El usuario no existe o las credenciales son inválidas');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('El usuario no existe o las credenciales son inválidas');
    }

    const payload = { email: user.email, sub: user.id, role: user.role, institutionId: user.institutionId, gradeId: user.gradeId };
    const { password, ...userData } = user;
    
    return {
      access_token: this.jwtService.sign(payload),
      user: userData,
    };
  }
}
