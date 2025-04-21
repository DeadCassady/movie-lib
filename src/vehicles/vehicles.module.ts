import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from 'src/films/entities/film.entity';
import { Person } from 'src/people/entities/person.entity';
import { Vehicle } from './entities/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Person, Film])],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule { }
