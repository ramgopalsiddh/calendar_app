// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',  // Allow frontend to access backend
  });
  await app.listen(3001);  // Ensure backend is listening on port 3001
}
bootstrap();
