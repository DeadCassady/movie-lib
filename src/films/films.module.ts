import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { Specie } from 'src/species/entities/species.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Person } from 'src/people/entities/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person, Planet, Starship, Vehicle, Specie, Film])],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule { }
