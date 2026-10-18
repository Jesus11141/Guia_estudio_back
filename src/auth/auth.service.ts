import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

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
