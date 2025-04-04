import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Person } from 'src/people/entities/person.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Specie } from 'src/species/entities/species.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

const url = 'http://localhost:3000/api#/films/'

@Entity()
export class Film {
  @ApiProperty({ description: 'This is the film id', nullable: false })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ description: 'This is the title of the film', nullable: false })
  @Column()
  title: string;
  @ApiProperty({ description: "This is the film's episode id", nullable: false })
  @Column()
  episode_id: number;
  @ApiProperty({ description: "This is the film's opening crawl", nullable: false })
  @Column()
  opening_crawl: string;
  @ApiProperty({ description: 'This field defined the director', nullable: false })
  @Column()
  director: string;
  @ApiProperty({ description: 'This is the producer', nullable: false })
  @Column()
  producer: string;
  @ApiProperty({ description: 'This is the release date', nullable: false })
  @Column()
  release_date: string;
  @ApiProperty({ description: 'A list of characters in the film', nullable: false })
  @ManyToMany(() => Person, (person) => person.films)
  @JoinTable()
  characters: (Person | string)[];
  @ApiProperty({ description: 'A number of planets that appear in the movie', nullable: false })
  @ManyToMany(() => Planet, (planet) => planet.films, { cascade: true })
  @JoinTable()
  planets: (Planet | string)[];
  @ApiProperty({ description: 'A list of starships that appear in the film', nullable: false })
  @ManyToMany(() => Starship, (starship) => starship.films)
  @JoinTable()
  starships: (Starship | string)[];
  @ApiProperty({ description: 'A list of vehicles that appear in the film', nullable: false })
  @ManyToMany(() => Vehicle, (vehicle) => vehicle.films)
  @JoinTable()
  vehicles: (Vehicle | string)[];
  @ApiProperty({ description: 'These are the species that appear in the movie', nullable: false })
  @ManyToMany(() => Specie, (specie) => specie.films)
  @JoinTable()
  species: (Specie | string)[];
  @ApiProperty({ description: 'This is when the this is when the entry was created', nullable: false })
  @Column()
  created: Date;
  @ApiProperty({ description: 'This is when the entry was changed', nullable: false })
  @Column()
  edited: Date;
  @ApiProperty({ description: 'This is a url of the film', nullable: false })
  @Expose()
  @Column()
  url: string;
  @AfterLoad()
  generateUrl() {
    this.url = `${url}${this.id}`
  }
}
