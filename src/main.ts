import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'reflect-metadata';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('My API') // Назва API
    .setDescription(`It's an API for navigating a movie library`) // Опис
    .setVersion('1.0') // Версія
    .addTag('movie lib') // Теги для групування ендпоінтів
    .addBearerAuth() // Підтримка Bearer Token (якщо є автентифікація)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'API Docs',
    swaggerOptions: {
      persistAuthorization: true,
      defaultModelExpandDepth: 3,
    },
  });
  app.useGlobalFilters(new GlobalExceptionFilter)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((e: Error) => console.log(e));
