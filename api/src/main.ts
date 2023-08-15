import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Hawk Status API Docs')
    .setDescription('API Documentation for the Hawk Status service.')
    .setVersion('1.0')
    .addTag('hawkstatus')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const logger = new Logger();
  await app.listen(process.env.API_PORT, '0.0.0.0');
  const appUrl = await app.getUrl();
  logger.log(`🚀 Server ready at ${appUrl}`);
}
bootstrap();
