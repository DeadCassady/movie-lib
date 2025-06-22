import { ApiProperty } from '@nestjs/swagger';
import { Image } from '../../../image-upload/entities/image.entity'
import { Expose } from 'class-transformer';
import {
  AfterLoad,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Planet } from '../../planets/entities/planet.entity';
import { Film } from '../../films/entities/film.entity';
import { Specie } from '../../species/entities/species.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { Starship } from '../../starships/entities/starship.entity';

const url = 'http://localhost:3000/api#/people/'

@Entity()
export class Person {
  @ApiProperty({ description: 'This is the person id', nullable: false })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ description: 'This is the name of the person', nullable: false })
  @Column()
  name: string;
  @ApiProperty({ description: "This is the person's height", nullable: false })
  @Column()
  height: string;
  @ApiProperty({ description: "This is the person's mass", nullable: false })
  @Column()
  mass: string;
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
  @ManyToOne(() => Planet, (planet) => planet.residents,
    { nullable: true })
  homeworld: Planet | null;
  @ApiProperty({ description: 'This is the films that the person has been in', nullable: false })
  @ManyToMany(() => Film, (film) => film.characters, { cascade: true })
  films?: Film[];
  @ApiProperty({ description: 'This is the species', nullable: false })
  @ManyToMany(() => Specie, (specie) => specie.people, { cascade: true })
  @JoinTable()
  species?: Specie[];
  @ApiProperty({ description: 'These are the vehicles', nullable: false })
  @ManyToMany(() => Vehicle, (vehicle) => vehicle.pilots, { cascade: true })
  @JoinTable()
  vehicles?: Vehicle[];
  @ApiProperty({ description: 'A list of starships', nullable: false })
  @ManyToMany(() => Starship, (starship) => starship.pilots, { cascade: true })
  @JoinTable()
  starships?: Starship[];
  @ApiProperty({ description: 'This is the array of images', nullable: false })
  @ManyToMany(() => Image, (image) => image.person)
  @JoinTable()
  images?: Image[];
  @ApiProperty({ description: 'This is when the character was created', nullable: false })
  @Column()
  created: Date;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @Column()
  edited: Date;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @Expose()
  @Column({ nullable: true })
  url: string;
  @AfterLoad()
  generateUrl() {
    this.url = `${url}${this.id}/`
  }
}
