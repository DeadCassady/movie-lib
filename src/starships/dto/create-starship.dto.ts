import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';
import { Person } from 'src/people/entities/person.entity';
import { ManyToMany } from 'typeorm';

export class CreateStarshipDto {
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsNumber()
  id: number;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  name: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  model: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  manufacturer: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  cost_in_credits: number;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsNumber()
  length: number;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  max_atmosphering_speed: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsNumber()
  crew: number;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsNumber()
  passengers: number;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsNumber()
  cargo_capacity: number;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  consumables: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsNumber()
  hyperdrive_rating: number;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsNumber()
  MGLT: number;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  starship_class: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsArray()
  @IsString()
  pilots: string[];
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsArray()
  @IsString({ each: true })
  films: string[];
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsDate()
  created: Date;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsDate()
  edited: Date;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  url: string;
}
