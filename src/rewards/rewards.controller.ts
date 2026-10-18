import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('api/rewards')
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @Post()
  create(@Body() createRewardDto: any) {
    return this.rewardsService.create(createRewardDto);
  }

  @Get('claims')
  getClaims(@Request() req: any) {
    return this.rewardsService.getClaims(req.user.institutionId);
  }

  @Patch('claims/:id')
  updateClaim(@Param('id') id: string, @Body() body: any) {
    return this.rewardsService.updateClaimStatus(id, body.status);
  }

  @Get()
  findAll(@Request() req: any) {
    // If student, they might only see rewards for their institution
    return this.rewardsService.findAll(req.user.institutionId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRewardDto: any) {
    return this.rewardsService.update(id, updateRewardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rewardsService.remove(id);
  }

  @Post(':id/redeem')
  redeem(@Param('id') id: string, @Request() req: any) {
    return this.rewardsService.redeem(req.user.id, id);
  }
}
