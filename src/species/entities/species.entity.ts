import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Person } from 'src/people/entities/person.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Film } from 'src/films/entities/film.entity'
import {
  AfterLoad,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

const url = 'http://localhost:3000/api#/species/'

@Entity()
export class Specie {
  @ApiProperty({ description: 'This is the specie id', nullable: false })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ description: 'This is the name of the specie', nullable: false })
  @Column()
  name: string;
  @ApiProperty({ description: "This is the specie's classification", nullable: false })
  @Column()
  classification: string
  @ApiProperty({ description: 'This is the homeworld of the specie', nullable: false })
  @Column()
  homeworld: (Planet | string);
  @ApiProperty({ description: "This is the specie's language", nullable: false })
  @Column()
  language: string;
  @ApiProperty({ description: 'The number of people of the given specie', nullable: false })
  @OneToMany(() => Person, (person) => person.species)
  people: (Person | string)[];
  @ApiProperty({ description: 'The number of people of the given specie', nullable: false })
  @ManyToMany(() => Film, (film) => film.species)
  films: Film[];
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
