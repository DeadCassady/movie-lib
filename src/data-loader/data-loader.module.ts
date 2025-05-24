import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataLoaderService } from "./data-loader.service";
import { Person } from "src/db-entities/people/entities/person.entity";
import { Planet } from "src/db-entities/planets/entities/planet.entity";
import { Starship } from "src/db-entities/starships/entities/starship.entity";
import { Vehicle } from "src/db-entities/vehicles/entities/vehicle.entity";
import { Specie } from "src/db-entities/species/entities/species.entity";
import { Film } from "src/db-entities/films/entities/film.entity";
import { User } from "src/users/entities/user.entity";


@Module({
  imports: [TypeOrmModule.forFeature([Person, Planet, Starship, Vehicle, Specie, Film, User])],
  providers: [DataLoaderService],
})
export class DataLoaderModule { }
