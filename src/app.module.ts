import { Module } from '@nestjs/common';
import { PeopleModule } from './people/people.module';
import { PlanetsModule } from './planets/planets.module';
import { StarshipsModule } from './starships/starships.module';
import { SpeciesModule } from './species/species.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { FilmsService } from './films/films.service';
import { VehiclesService } from './vehicles/vehicles.service';
import { SpeciesService } from './species/species.service';
import { FilmsModule } from './films/films.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { PeopleService } from './people/people.service';
import { StarshipsService } from './starships/starships.service';

@Module({
  controllers: [],
  providers: [FilmsService, VehiclesService, SpeciesService, PeopleService, StarshipsService, FilmsModule],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'movie_lib',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [join(__dirname + '/migrations/*.ts')],
    }),
    PeopleModule,
    PlanetsModule,
    StarshipsModule,
    FilmsModule,
    VehiclesModule,
    SpeciesModule,
  ],
})
export class AppModule { }
