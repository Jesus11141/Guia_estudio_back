import { Controller, Get, Post, Put, Patch, Delete, Body, Param, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('me/avatar')
  async updateAvatar(@Req() req: any, @Body() body: { avatar: string }) {
    return this.usersService.updateAvatar(req.user.id, body.avatar);
  }

  @Post('me/buy-avatar')
  async buyAvatar(@Req() req: any, @Body() body: { avatarId: string; cost: number }) {
    return this.usersService.buyOrEquipAvatar(req.user.id, body.avatarId, body.cost);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.usersService.findAll(req.user);
  }

  @Post()
  create(@Req() req: any, @Body() body: { email: string; pass?: string; role: Role; name?: string; institutionId?: string; gradeId?: string; hasGames?: boolean }) {
    if (req.user.role === 'ADMIN') {
      body.institutionId = req.user.institutionId;
      if (body.role === 'SUPER_ADMIN' || body.role === 'ADMIN') {
        throw new ForbiddenException('No tienes permisos para crear este tipo de usuario.');
      }
    }
    return this.usersService.create(body);
  }

  @Put(':id')
  async update(@Req() req: any, @Param('id') id: string, @Body() body: { name?: string; pass?: string; gradeId?: string; hasGames?: boolean }) {
    if (req.user.role === 'ADMIN') {
      const targetUser = await this.usersService.findById(id);
      if (!targetUser || targetUser.institutionId !== req.user.institutionId) {
         throw new ForbiddenException('No tienes permisos para editar este usuario.');
      }
    }
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  async remove(@Req() req: any, @Param('id') id: string) {
    if (req.user.role === 'ADMIN') {
      const targetUser = await this.usersService.findById(id);
      if (!targetUser || targetUser.institutionId !== req.user.institutionId) {
         throw new ForbiddenException('No tienes permisos para eliminar este usuario.');
      }
    }
    return this.usersService.remove(id);
  }
}
