import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RewardsService {
  constructor(private prisma: PrismaService) {}

  // ----------------------------------------------------
  // ADMIN ROUTES (Rewards Management)
  // ----------------------------------------------------

  async create(data: { name: string; cost: number; imageUrl?: string; institutionId?: string }) {
    return this.prisma.reward.create({
      data: {
        name: data.name,
        cost: Number(data.cost),
        imageUrl: data.imageUrl,
        institutionId: data.institutionId || null,
      },
    });
  }

  async findAll(institutionId?: string) {
    const where = institutionId ? { institutionId } : {};
    return this.prisma.reward.findMany({
      where,
      orderBy: { cost: 'asc' },
    });
  }

  async update(id: string, data: any) {
    if (data.cost !== undefined) data.cost = Number(data.cost);
    return this.prisma.reward.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.reward.delete({ where: { id } });
  }

  // ----------------------------------------------------
  // STUDENT ROUTES (Redeeming)
  // ----------------------------------------------------

  async redeem(userId: string, rewardId: string) {
    // We need a transaction to safely deduct stars and create the claim
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
      const reward = await tx.reward.findUnique({ where: { id: rewardId } });

      if (!user) throw new NotFoundException('User not found');
      if (!reward) throw new NotFoundException('Reward not found');
      if (user.stars < reward.cost) {
        throw new BadRequestException('Not enough stars');
      }

      // Deduct stars
      await tx.user.update({
        where: { id: userId },
        data: { stars: user.stars - reward.cost },
      });

      // Create claim
      const claim = await tx.rewardClaim.create({
        data: {
          userId,
          rewardId,
          status: 'PENDING',
        },
        include: { reward: true }
      });

      return claim;
    });
  }

  // ----------------------------------------------------
  // ADMIN ROUTES (Claims Management)
  // ----------------------------------------------------

  async getClaims(institutionId?: string) {
    const where = institutionId ? { user: { institutionId } } : {};
    return this.prisma.rewardClaim.findMany({
      where,
      include: {
        user: { select: { id: true, name: true, email: true } },
        reward: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateClaimStatus(id: string, status: string) {
    return this.prisma.rewardClaim.update({
      where: { id },
      data: { status },
      include: { user: true, reward: true },
    });
  }
}
