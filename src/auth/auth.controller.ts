import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body: { email: string; pass: string }) {
    return this.authService.login(body.email, body.pass);
  }

  @Post('register')
  register(
    @Body()
    body: {
      email: string;
      pass: string;
      name?: string;
      gradeId?: string;
      hasGames?: boolean;
    },
  ) {
    return this.authService.register(body);
  }

  @Get('grades')
  getPublicGrades() {
    return this.authService.getPublicGrades();
  }
}
