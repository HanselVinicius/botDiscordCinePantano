import { NestFactory } from '@nestjs/core';
import { AppModule } from './configuration/app.module';
import { loadEnvFile } from 'node:process';

async function bootstrap(): Promise<void> {
  loadEnvFile();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
