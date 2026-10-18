import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as fs from 'fs';
async function bootstrap() {
  fs.mkdirSync('./uploads/images', { recursive: true });
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // <--- HABILITAR CORS AQUÍ
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
