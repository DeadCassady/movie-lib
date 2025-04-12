import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Planet } from './entities/planet.entity';
import { Repository } from 'typeorm';
import { Person } from 'src/people/entities/person.entity';
import { Film } from 'src/films/entities/film.entity';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(Planet)
    private planetsRepository: Repository<Planet>,
    @InjectRepository(Person)
    private peopleRepository: Repository<Person>,
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
  ) { }

  async create(createPlanetDto: CreatePlanetDto): Promise<Planet> {
    const planet = new Planet()
    Object.assign(planet, createPlanetDto)

    const people = await Promise.all(createPlanetDto.residents.map(async (DTO) => {
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
    const films = await Promise.all(createPlanetDto.films.map(async (DTO) => {
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
      Object.assign(planet, { residents: people, films })
      return this.planetsRepository.save(planet);
    } catch (error) {
      throw new InternalServerErrorException("Failed to create a new starship")
    }
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
    return this.findOne(id);
  }


  async transform(dto: UpdatePlanetDto) {


    const people = dto.people?.map(async (DTO) => {
      return await this.people.findOne({
        where: { title: DTO }
      }).then((data) => {
        if (!data) {
          throw new NotFoundException(`The specie ${DTO} was not found`)
        } else {
          return data
        }
      })
    })

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

    Promise.all([planet, films, species, vehicles, starships]);

    const newObj = {
      name: dto.name || undefined,
      height: dto.height || undefined,
      mass: dto.mass || undefined,
      hair_color: dto.hair_color || undefined,
      skin_color: dto.hair_color || undefined,
      eye_color: dto.eye_color || undefined,
      birth_year: dto.birth_year || undefined,
      gender: dto.gender || undefined,
      homeworld: planet || undefined,
      films: films || undefined,
      species: species || undefined,
      vehicles: vehicles || undefined,
      starships: starships || undefined,
      edited: new Date()
    }
    return newObj
  }

  async remove(id: number): Promise<void> {
    const result = await this.planetsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Planet with ID ${id} not found`);
    }
  }
}
