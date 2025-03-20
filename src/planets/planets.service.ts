import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Planet } from './entities/planet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(Planet)
    private planetsRepository: Repository<Planet>,
  ) { }

  create(createPlanetDto: CreatePlanetDto): Promise<Planet> {
    const planet = this.planetsRepository.create(createPlanetDto);
    return this.planetsRepository.save(planet);
  }

  findAll(): Promise<Planet[]> {
    return this.planetsRepository.find();
  }

  async findOne(id: number): Promise<Planet> {
    const planet = await this.planetsRepository.findOneBy({ id });
    if (!planet) {
      throw new NotFoundException(`Planet with ID ${id} not found`);
    }
    return planet;
  }

  async update(id: number, updatePlanetDto: UpdatePlanetDto): Promise<Planet> {
    await this.planetsRepository.update(id, updatePlanetDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.planetsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Planet with ID ${id} not found`);
    }
  }
}
