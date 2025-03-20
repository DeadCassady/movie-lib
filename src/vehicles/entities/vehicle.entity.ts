import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Person } from 'src/people/entities/person.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  AfterLoad,
} from 'typeorm';

const url = 'http://localhost:3000/api#/vehicles/'

@Entity()
export class Vehicle {
  @ApiProperty({ description: 'This is the ID', nullable: false })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ description: 'This is the name of the vehicle', nullable: false })
  @Column()
  name: string;
  @ApiProperty({ description: 'This is the model of the vehicle', nullable: false })
  @Column()
  model: string;
  @ApiProperty({ description: 'This is the manufacturer of the ship', nullable: false })
  @Column()
  manufacturer: string;
  @ApiProperty({ description: 'This is the cost of the vehicle', nullable: false })
  @Column()
  cost_in_credits: number;
  @ApiProperty({ description: 'This is the length of the vehicle', nullable: false })
  @Column()
  length: number;
  @ApiProperty({ description: 'This is the max speed', nullable: false })
  @Column()
  max_atmosphering_speed: string;
  @ApiProperty({ description: 'This is the number of people', nullable: false })
  @Column()
  crew: number;
  @ApiProperty({ description: 'This is the number of passengers on the ship', nullable: false })
  @Column()
  passengers: number;
  @ApiProperty({ description: 'This is the cargo capacity', nullable: false })
  @Column()
  cargo_capacity: number;
  @ApiProperty({ description: `This is the number of years that the ship won't run out of the consumables`, nullable: false })
  @Column()
  consumables: string;
  @ApiProperty({ description: 'This is the vehicle class', nullable: false })
  @Column()
  vehicle_class: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @ManyToMany(() => Person, (person) => person.url)
  @JoinTable({
    name: 'vehicle',
    joinColumn: { name: 'vehicle', referencedColumnName: 'url' },
    inverseJoinColumn: { name: 'person_url', referencedColumnName: 'url' },
  })
  pilots: Person[];
  @ApiProperty({ description: 'This is the array of films', nullable: false })
  @Column({ type: 'text', array: true })
  films: string[];
  @ApiProperty({ description: 'This is when the vehicle was created', nullable: false })
  @Column()
  created: Date;
  @ApiProperty({ description: 'This is when the vehicle was edited', nullable: false })
  @Column()
  edited: Date;
  @ApiProperty({ description: 'This is the url of the vehicle', nullable: false })
  @Expose()
  @Column()
  url: string;
  @AfterLoad()
  generateUrl() {
    this.url = `${url}${this.id}`
  }
}
