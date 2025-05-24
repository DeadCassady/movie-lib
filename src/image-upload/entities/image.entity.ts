import { Film } from "src/db-entities/films/entities/film.entity";
import { Person } from "src/db-entities/people/entities/person.entity";
import { Planet } from "src/db-entities/planets/entities/planet.entity";
import { Specie } from "src/db-entities/species/entities/species.entity";
import { Starship } from "src/db-entities/starships/entities/starship.entity";
import { Vehicle } from "src/db-entities/vehicles/entities/vehicle.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  filename: string
  @Column()
  originalName: string
  @Column()
  path: string
  @ManyToOne(() => Person, (person) => person.images)
  person?: Person
  @ManyToOne(() => Film, (film) => film.images)
  film?: Film
  @ManyToOne(() => Specie, (specie) => specie.images)
  specie?: Specie
  @ManyToOne(() => Planet, (planet) => planet.images)
  planet?: Planet
  @ManyToOne(() => Starship, (starship) => starship.images)
  starship?: Starship
  @ManyToOne(() => Vehicle, (vehicle) => vehicle.images)
  vehicle?: Vehicle
}
