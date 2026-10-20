import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) { return this.prisma.user.findUnique({ where: { id } }); }

  async updateAvatar(userId: string, avatar: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { avatar },
      select: { id: true, email: true, role: true, name: true, institutionId: true, gradeId: true, hasGames: true, stars: true, avatar: true, unlockedAvatars: true, institution: true }
    });
  }

  async buyOrEquipAvatar(userId: string, avatarId: string, cost: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new BadRequestException('Usuario no encontrado');

    const unlocked = user.unlockedAvatars || [];
    // If already unlocked or free starter avatar, just equip it
    if (unlocked.includes(avatarId) || cost <= 0) {
      const dataToUpdate: any = { avatar: avatarId };
      if (!unlocked.includes(avatarId)) {
        dataToUpdate.unlockedAvatars = { push: avatarId };
      }
      return this.prisma.user.update({
        where: { id: userId },
        data: dataToUpdate,
        select: { id: true, email: true, role: true, name: true, institutionId: true, gradeId: true, hasGames: true, stars: true, avatar: true, unlockedAvatars: true, institution: true }
      });
    }

    // Check stars
    if (user.stars < cost) {
      throw new BadRequestException(`No tienes suficientes estrellas. Necesitas ${cost} estrellas y tienes ${user.stars}.`);
    }

    // Deduct stars and unlock avatar
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        stars: user.stars - cost,
        avatar: avatarId,
        unlockedAvatars: { push: avatarId },
      },
      select: { id: true, email: true, role: true, name: true, institutionId: true, gradeId: true, hasGames: true, stars: true, avatar: true, unlockedAvatars: true, institution: true }
    });
  }

  async findAll(currentUser: any) {
    const where: any = {};
    if (currentUser.role === 'ADMIN') {
      where.institutionId = currentUser.institutionId; // ADMIN only sees their institution's users
    }
    // SUPER_ADMIN sees all, STUDENT shouldn't really be calling this endpoint.

    return this.prisma.user.findMany({
      where,
      include: { institution: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: { email: string; pass?: string; role: Role; name?: string; institutionId?: string; gradeId?: string; hasGames?: boolean }) {
    const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      throw new BadRequestException('El correo ya está registrado');
    }
    
    const plainPass = data.pass || '123456';
    const hashedPassword = await bcrypt.hash(plainPass, 10);

    return this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: data.role,
        name: data.name,
        institutionId: data.institutionId,
        gradeId: data.gradeId,
        hasGames: data.hasGames !== undefined ? data.hasGames : true,
      },
      select: { id: true, email: true, role: true, name: true, institutionId: true, gradeId: true, hasGames: true, stars: true, avatar: true, unlockedAvatars: true, institution: true }
    });
  }

  async update(id: string, data: { name?: string; pass?: string; gradeId?: string; hasGames?: boolean; role?: Role; institutionId?: string | null }) {
    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.gradeId !== undefined) updateData.gradeId = data.gradeId;
    if (data.hasGames !== undefined) updateData.hasGames = data.hasGames;
    if (data.role !== undefined) updateData.role = data.role;
    if (data.institutionId !== undefined) updateData.institutionId = data.institutionId;
    if (data.pass !== undefined && data.pass.length > 0) {
      updateData.password = await bcrypt.hash(data.pass, 10);
    }
    
    return this.prisma.user.update({
      where: { id },
      data: updateData,
      select: { id: true, email: true, role: true, name: true, institutionId: true, gradeId: true, hasGames: true, stars: true, avatar: true, unlockedAvatars: true, institution: true }
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
