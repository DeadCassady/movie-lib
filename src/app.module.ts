import { Module } from '@nestjs/common';
import { PeopleModule } from './people/people.module';
import { PlanetsModule } from './planets/planets.module';
import { StarshipsModule } from './starships/starships.module';
import { SpeciesModule } from './species/species.module';
import { FilmsModule } from './films/films.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderModule } from './data-loader/data-loader.module';
import { ImageModule } from './image-upload/image.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';

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
    PeopleModule,
    PlanetsModule,
    StarshipsModule,
    FilmsModule,
    VehiclesModule,
    SpeciesModule,
    DataLoaderModule,
    ImageModule,
    AuthModule
  ],
  controllers: [AppController],
})
export class AppModule { }
