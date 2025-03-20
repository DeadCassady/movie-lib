import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Film } from 'src/films/entities/film.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Specie } from 'src/species/entities/species.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import {
  AfterLoad,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreatePersonDto } from '../dto/create-person.dto';
import { UpdatePersonDto } from '../dto/update-person.dto';

const url = 'http://localhost:3000/api#/people/'

@Entity()
export class Person {
  private constructor(dto: CreatePersonDto | UpdatePersonDto) {

  }
  @ApiProperty({ description: 'This is the person id', nullable: false })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ description: 'This is the name of the person', nullable: false })
  @Column()
  name: string;
  @ApiProperty({ description: "This is the person's height", nullable: false })
  @Column()
  height: number;
  @ApiProperty({ description: "This is the person's mass", nullable: false })
  @Column()
  mass: number;
  @ApiProperty({ description: 'This field defined the hair color', nullable: false })
  @Column()
  hair_color: string;
  @ApiProperty({ description: 'This is the scin color', nullable: false })
  @Column()
  skin_color: string;
  @ApiProperty({ description: 'This is the eye color', nullable: false })
  @Column()
  eye_color: string;
  @ApiProperty({ description: 'This is the birth year', nullable: false })
  @Column()
  birth_year: string;
  @ApiProperty({ description: 'This is the gender', nullable: false })
  @Column()
  gender: string;
  @ApiProperty({ description: 'A home planet', nullable: false })
  @ManyToOne(() => Planet, (planet) => planet.residents)
  homeworld: Planet;
  @ApiProperty({ description: 'This is the films that the person has been in', nullable: false })
  @ManyToMany(() => Film, (film) => film.characters, { cascade: true })
  @JoinTable()
  films: Film[];
  @ApiProperty({ description: 'This is the species', nullable: false })
  @ManyToMany(() => Specie, (specie) => specie.people, { cascade: true })
  @JoinTable()
  species: Specie[];
  @ApiProperty({ description: 'These are the vehicles', nullable: false })
  @ManyToMany(() => Vehicle, (vehicle) => vehicle.pilots, { cascade: true })
  @JoinTable()
  vehicles: Vehicle[];
  @ApiProperty({ description: 'A list of starships', nullable: false })
  @ManyToMany(() => Starship, (starship) => starship.pilots, { cascade: true })
  @JoinTable()
  starships: Starship[];
  @ApiProperty({ description: 'This is when the character was created', nullable: false })
  @Column()
  created: Date;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @Column()
  edited: Date;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @Expose()
  @Column()
  url: string;
  @AfterLoad()
  generateUrl() {
    this.url = `${url}${this.id}/`
  }
}
