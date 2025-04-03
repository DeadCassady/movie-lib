import { Module } from '@nestjs/common';
import { PeopleModule } from './people/people.module';
import { PlanetsModule } from './planets/planets.module';
import { StarshipsModule } from './starships/starships.module';
import { SpeciesModule } from './species/species.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { FilmsModule } from './films/films.module';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
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
      synchronize: true,
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
