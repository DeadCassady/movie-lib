import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Film } from "src/films/entities/film.entity";
import { Person } from "src/people/entities/person.entity";
import { Planet } from "src/planets/entities/planet.entity";
import { Specie } from "src/species/entities/species.entity";
import { Starship } from "src/starships/entities/starship.entity";
import { Vehicle } from "src/vehicles/entities/vehicle.entity";
import { DataLoaderService } from "./data-loader.service";
import { DataLoaderController } from "./data-loader.controller";


@Module({
  imports: [TypeOrmModule.forFeature([Person, Planet, Starship, Vehicle, Specie, Film])],
  controllers: [DataLoaderController],
  providers: [DataLoaderService],
})
export class DataLoaderModule { }
