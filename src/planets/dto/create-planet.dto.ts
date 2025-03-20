import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';
import { Person } from 'src/people/entities/person.entity';
import { OneToMany } from 'typeorm';

export class CreatePlanetDto {
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsNumber()
  readonly id: number;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  readonly name: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsNumber()
  readonly rotation_period: number;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsNumber()
  readonly orbital_period: number;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsNumber()
  readonly diameter: number;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  readonly climate: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  readonly gravity: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  readonly terrain: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsNumber()
  readonly surface_water: number;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsNumber()
  readonly population: number;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @OneToMany(() => Person, (person) => person.url)
  readonly residents: Person[];
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsArray()
  @IsString({ each: true })
  readonly films: string[];
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsDate()
  readonly created: Date;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsDate()
  readonly edited: Date;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  readonly url: string;
}
