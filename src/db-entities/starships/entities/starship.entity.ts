import { ApiProperty } from '@nestjs/swagger';
import { Image } from '../../../image-upload/entities/image.entity'
import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  AfterLoad,
  JoinTable,
} from 'typeorm';
import { Film } from '../../films/entities/film.entity';
import { Person } from '../../people/entities/person.entity';

const url = 'http://localhost:3000/api#/starships/'

@Entity()
export class Starship {
  @ApiProperty({ description: 'This is the ID', nullable: false })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ description: 'This is the name of the starship', nullable: false })
  @Column()
  name: string;
  @ApiProperty({ description: 'This is the model of the starship', nullable: false })
  @Column()
  model: string;
  @ApiProperty({ description: 'This is the manufacturer of the ship', nullable: false })
  @Column()
  manufacturer: string;
  @ApiProperty({ description: 'This is the cost of the starship', nullable: false })
  @Column()
  cost_in_credits: string;
  @ApiProperty({ description: 'This is the length of the starship', nullable: false })
  @Column()
  length: string;
  @ApiProperty({ description: 'This is the max speed', nullable: false })
  @Column()
  max_atmosphering_speed: string;
  @ApiProperty({ description: 'This is the number of people', nullable: false })
  @Column()
  crew: string;
  @ApiProperty({ description: 'This is the number of passengers on the ship', nullable: false })
  @Column()
  passengers: string;
  @ApiProperty({ description: 'This is the cargo capacity', nullable: false })
  @Column()
  cargo_capacity: string;
  @ApiProperty({ description: `This is the number of years that the ship won't run out of the consumables`, nullable: false })
  @Column()
  consumables: string;
  @ApiProperty({ description: 'This is the hyperdrive rating', nullable: false })
  @Column()
  hyperdrive_rating: string;
  @ApiProperty({ description: 'This is the MGLT', nullable: false })
  @Column()
  MGLT: string;
  @ApiProperty({ description: 'This is the starship class', nullable: false })
  @Column()
  starship_class: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @ManyToMany(() => Person, (person) => person.starships)
  pilots: Person[];
  @ApiProperty({ description: 'This is the array of films', nullable: false })
  @ManyToMany(() => Film, (film) => film.starships)
  films: Film[];
  @ApiProperty({ description: 'This is the array of images', nullable: false })
  @ManyToMany(() => Image, (image) => image.starship)
  @JoinTable()
  images: Image[];
  @ApiProperty({ description: 'Note identifier', nullable: false })
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
    this.url = `${url}${this.id}`
  }
}
