import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderModule } from './data-loader/data-loader.module';
import { ImageModule } from './image-upload/image.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SwapiModule } from './db-entities/swapi.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'movie_lib',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      dropSchema: true
    }),
    AuthModule,
    UsersModule,
    DataLoaderModule,
    ImageModule,
    SwapiModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
