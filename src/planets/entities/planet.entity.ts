import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Film } from 'src/films/entities/film.entity';
import { Person } from 'src/people/entities/person.entity';
import { AfterLoad, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

const url = 'http://localhost:3000/api#/planets/'

@Entity()
export class Planet {
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @Column()
  name: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @Column()
  rotation_period: number;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @Column()
  orbital_period: number;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @Column()
  diameter: number;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @Column()
  climate: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @Column()
  gravity: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @Column()
  terrain: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @Column()
  surface_water: number;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @Column()
  population: number;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @OneToMany(() => Person, (person) => person.homeworld)
  residents: (Person | string)[];
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @ManyToMany(() => Film, (film) => film.planets)
  films: (Film | string)[];
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
