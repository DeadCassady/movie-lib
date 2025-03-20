import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { Specie } from './entities/species.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Specie])],
  controllers: [SpeciesController],
  providers: [SpeciesService],
})
export class SpeciesModule { }
