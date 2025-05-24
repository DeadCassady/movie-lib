import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Starship } from './entities/starship.entity';
import { Repository } from 'typeorm';
import { TransformStarshipDto } from './dto/transform-starship.dto';
import { Person } from '../people/entities/person.entity';
import { Film } from '../films/entities/film.entity';

@Injectable()
export class StarshipsService {
  constructor(
    @InjectRepository(Starship)
    private starshipsRepository: Repository<Starship>,
    @InjectRepository(Person)
    private peopleRepository: Repository<Person>,
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
  ) { }

  async create(createStarshipDto: CreateStarshipDto): Promise<Starship> {
    const starship = new Starship()
    Object.assign(starship, createStarshipDto)

    const people = await Promise.all(createStarshipDto.pilots.map(async (DTO) => {
      return await this.peopleRepository.findOne({
        where: { name: DTO }
      }).then((data) => {
        if (!data) {
          throw new NotFoundException(`Person ${DTO} was not found`)
        } else {
          return data
        }
      })
    }))
    const films = await Promise.all(createStarshipDto.films.map(async (DTO) => {
      return await this.filmsRepository.findOne({
        where: { title: DTO }
      }).then((data) => {
        if (!data) {
          throw new NotFoundException(`Film ${DTO} was not found`)
        } else {
          return data
        }
      })
    }))

    try {
      Object.assign(starship, { pilots: people, films })
      return this.starshipsRepository.save(starship);
    } catch (error) {
      throw new InternalServerErrorException("Failed to create a new starship")
    }
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
  ) {
    const obj = await this.transform(updateStarshipDto)
    try {
      await this.starshipsRepository.update(id, obj);
      return this.findOne(id);
    } catch (error) {

      throw new InternalServerErrorException(`Was not able to update the film with ID ${id}`)
    }
  }

  async transform(dto: UpdateStarshipDto) {
    const starship = new TransformStarshipDto

    const films = dto.films?.map(async (DTO) => {
      return await this.filmsRepository.findOne({
        where: { title: DTO }
      }).then((data) => {
        if (!data) {
          throw new NotFoundException(`The specie ${DTO} was not found`)
        } else {
          return data
        }
      })
    })

    const people = dto.pilots?.map(async (DTO) => {
      return await this.peopleRepository.findOne({
        where: { name: DTO }
      }).then((data) => {
        if (!data) {
          throw new NotFoundException(`The person ${DTO} was not found`)
        } else {
          return data
        }
      })
    })

    Promise.all([films, people]);

    Object.assign(starship, dto, { pilots: people, films })
    return starship
  }

  async remove(id: number): Promise<void> {
    const result = await this.starshipsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Starship with ID ${id} not found`);
    }
  }
}
