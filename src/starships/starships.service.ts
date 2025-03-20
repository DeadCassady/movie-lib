import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Starship } from './entities/starship.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StarshipsService {
  constructor(
    @InjectRepository(Starship)
    private starshipsRepository: Repository<Starship>,
  ) {}

  create(createStarshipDto: CreateStarshipDto): Promise<Starship> {
    const starship = this.starshipsRepository.create(createStarshipDto);
    return this.starshipsRepository.save(starship);
  }

  findAll(): Promise<Starship[]> {
    return this.starshipsRepository.find();
  }

  async findOne(id: number): Promise<Starship> {
    const starship = await this.starshipsRepository.findOneBy({ id });
    if (!starship) {
      throw new NotFoundException(`Starship with ID ${id} not found`);
    }
    return starship;
  }

  async update(
    id: number,
    updateStarshipDto: UpdateStarshipDto,
  ): Promise<Starship> {
    await this.starshipsRepository.update(id, updateStarshipDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.starshipsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Starship with ID ${id} not found`);
    }
  }
}
