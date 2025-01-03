import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const prismaService = app.get(PrismaService);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
  .setTitle('Order Management System')
  .setDescription('API documentation for the Order Management System')
  .setVersion('1.0')
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
