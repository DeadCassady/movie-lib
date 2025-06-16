import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'reflect-metadata';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('My swapi implementation') // The name of the api
    .setDescription(`It's an API for navigating a movie library`) // The description
    .setVersion('1.0') // The version
    .addTag('SWAPI Movie Library') // Теги для групування ендпоінтів
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
      'JWT-auth',)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'API Docs',
    swaggerOptions: {
      persistAuthorization: true,
      defaultModelExpandDepth: 3,
    },
  });
  app.enableCors()
  app.useGlobalFilters(new GlobalExceptionFilter)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((e: Error) => console.log(e));
