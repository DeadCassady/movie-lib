import { ApiProperty } from '@nestjs/swagger';
import { Image } from 'src/image-upload/entities/image.entity'
import { Expose } from 'class-transformer';
import {
  AfterLoad,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Specie } from 'src/db-entities/species/entities/species.entity';
import { Vehicle } from 'src/db-entities/vehicles/entities/vehicle.entity';
import { Starship } from 'src/db-entities/starships/entities/starship.entity';
import { Planet } from 'src/db-entities/planets/entities/planet.entity';
import { Person } from 'src/db-entities/people/entities/person.entity';

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
  characters: Person[];
  @ApiProperty({ description: 'A number of planets that appear in the movie', nullable: false })
  @ManyToMany(() => Planet, (planet) => planet.films, { cascade: true })
  @JoinTable()
  planets: Planet[];
  @ApiProperty({ description: 'A list of starships that appear in the film', nullable: false })
  @ManyToMany(() => Starship, (starship) => starship.films)
  @JoinTable()
  starships: Starship[];
  @ApiProperty({ description: 'A list of vehicles that appear in the film', nullable: false })
  @ManyToMany(() => Vehicle, (vehicle) => vehicle.films)
  @JoinTable()
  vehicles: Vehicle[];
  @ApiProperty({ description: 'These are the species that appear in the movie', nullable: false })
  @ManyToMany(() => Specie, (specie) => specie.films)
  @JoinTable()
  species: Specie[];
  @ApiProperty({ description: 'This is the array of images', nullable: false })
  @ManyToMany(() => Image, (image) => image.film)
  @JoinTable()
  images: Image[];
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
