import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderModule } from './data-loader/data-loader.module';
import { ImageModule } from './image-upload/image.module';
import { AuthModule } from './auth/auth.module';
import { PeopleModule } from './db-entities/people/people.module';
import { PlanetsModule } from './db-entities/planets/planets.module';
import { StarshipsModule } from './db-entities/starships/starships.module';
import { FilmsModule } from './db-entities/films/films.module';
import { VehiclesModule } from './db-entities/vehicles/vehicles.module';
import { SpeciesModule } from './db-entities/species/species.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';

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
    PeopleModule,
    PlanetsModule,
    StarshipsModule,
    FilmsModule,
    VehiclesModule,
    SpeciesModule,
    DataLoaderModule,
    ImageModule,
  ],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: RolesGuard
  //   }
  // ]
})
export class AppModule { }
