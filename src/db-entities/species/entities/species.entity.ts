import { ApiProperty } from '@nestjs/swagger';
import { Image } from 'src/image-upload/entities/image.entity'
import { Expose } from 'class-transformer';
import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Planet } from 'src/db-entities/planets/entities/planet.entity';
import { Person } from 'src/db-entities/people/entities/person.entity';
import { Film } from 'src/db-entities/films/entities/film.entity';

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
  @ManyToOne(() => Planet, { nullable: true })
  @JoinColumn()
  homeworld: Planet | null;
  @ApiProperty({ description: "This is the specie's language", nullable: false })
  @Column()
  language: string;
  @ApiProperty({ description: 'The number of people of the given specie', nullable: false })
  @OneToMany(() => Person, (person) => person.species)
  people: Person[];
  @ApiProperty({ description: 'The number of people of the given specie', nullable: false })
  @ManyToMany(() => Film, (film) => film.species)
  films: Film[];
  @ApiProperty({ description: 'This is the array of images', nullable: false })
  @ManyToMany(() => Image, (image) => image.specie)
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
