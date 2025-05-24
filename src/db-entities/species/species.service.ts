import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { Specie } from './entities/species.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransformSpeciesDto } from './dto/transform-species.dto';
import { Planet } from '../planets/entities/planet.entity';
import { Person } from '../people/entities/person.entity';
import { Film } from '../films/entities/film.entity';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Specie)
    private speciesRepository: Repository<Specie>,
    @InjectRepository(Planet)
    private planetsRepository: Repository<Planet>,
    @InjectRepository(Person)
    private peopleRepository: Repository<Person>,
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
  ) { }

  async create(createSpeciesDto: CreateSpeciesDto) {
    const specie = new Specie()
    specie.created = new Date()

    Object.assign(specie, createSpeciesDto)

    const planet = await this.planetsRepository.findOne({
      where: { name: createSpeciesDto.homeworld }
    }).then((data) => {
      if (!data) {
        throw new NotFoundException(`Planet ${createSpeciesDto.homeworld} was not found`)
      } else {
        return data
      }
    })
    const people = await Promise.all(createSpeciesDto.people.map(async (DTO) => {
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
    const films = await Promise.all(createSpeciesDto.films.map(async (DTO) => {
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
      Object.assign(specie, { homeworld: planet, residents: people, films })
      return this.speciesRepository.save(specie);
    } catch (error) {
      throw new InternalServerErrorException("Failed to create a new starship")
    }
  }

  findAll() {
    return `This action returns all species`;
  }

  findOne(id: number) {
    return `This action returns a #${id} species`;
  }

  async update(id: number, updateSpeciesDto: UpdateSpeciesDto) {
    const obj = await this.transform(updateSpeciesDto)
    try {
      await this.speciesRepository.update(id, obj);
      return this.findOne(id);
    } catch (error) {

      throw new InternalServerErrorException(`Was not able to update the film with ID ${id}`)
    }
  }

  async transform(dto: UpdateSpeciesDto) {
    const specie = new TransformSpeciesDto

    let planet: Planet | undefined

    if (dto.homeworld) {
      planet = await this.planetsRepository.findOne({
        where: { name: dto.homeworld }
      })
        .then((data) => {
          if (!data) {
            throw new NotFoundException(`The planet ${dto.homeworld} was not found`)
          } else {
            return data;
          }
        })
    }

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

    const people = dto.people?.map(async (DTO) => {
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

    Promise.all([films, people, planet]);

    Object.assign(specie, dto, { residents: people, homeworld: planet, films })
    return specie
  }

  remove(id: number) {
    return `This action removes a #${id} species`;
  }
}
