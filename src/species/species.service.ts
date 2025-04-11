import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { Specie } from './entities/species.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/people/entities/person.entity';
import { Film } from 'src/films/entities/film.entity';
import { Repository } from 'typeorm';
import { Planet } from 'src/planets/entities/planet.entity';

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

  update(id: number, updateSpeciesDto: UpdateSpeciesDto) {
    return `This action updates a #${id} species`;
  }

  remove(id: number) {
    return `This action removes a #${id} species`;
  }
}
