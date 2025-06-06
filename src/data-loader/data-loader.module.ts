import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataLoaderService } from "./data-loader.service";
import { Person } from "../db-entities/people/entities/person.entity";
import { Planet } from "../db-entities/planets/entities/planet.entity";
import { Starship } from "../db-entities/starships/entities/starship.entity";
import { Vehicle } from "../db-entities/vehicles/entities/vehicle.entity";
import { Specie } from "../db-entities/species/entities/species.entity";
import { Film } from "../db-entities/films/entities/film.entity";
import { User } from "../users/entities/user.entity";


@Module({
  imports: [TypeOrmModule.forFeature([Person, Planet, Starship, Vehicle, Specie, Film, User])],
  providers: [DataLoaderService],
})
export class DataLoaderModule { }
