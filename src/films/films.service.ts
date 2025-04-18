import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './entities/film.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from 'src/people/entities/person.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Specie } from 'src/species/entities/species.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { TransformFilmDto } from './dto/transform-film.dto';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,

    @InjectRepository(Person)
    private peopleRepository: Repository<Person>,
    @InjectRepository(Planet)
    private planetsRepository: Repository<Planet>,
    @InjectRepository(Starship)
    private starshipRepository: Repository<Starship>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Specie)
    private speciesRepository: Repository<Specie>,
  ) { }

  async create(createFilmDto: CreateFilmDto) {
    const film = new Film();
    Object.assign(film, createFilmDto)

    const characters = await Promise.all(createFilmDto.characters.map(async (DTO) => {

      await this.peopleRepository.findOne({
        where: { name: DTO }
      }).then((data) => {
        if (!data) {
          throw new NotFoundException(`Planet ${DTO} was not found`)
        } else {
          return data;
        }
      })
    }))

    const vehicles = await Promise.all(createFilmDto.vehicles.map(async (DTO) => {
      return await this.vehicleRepository.findOne({
        where: { name: DTO }
      }).then((data) => {
        if (!data) {
          throw new NotFoundException(`Vehicle ${DTO} was not found`)
        } else {
          return data
        }
      })
    }))

    const starships = await Promise.all(createFilmDto.starships.map(async (DTO) => {
      return await this.starshipRepository.findOne({
        where: { name: DTO }
      }).then((data) => {
        if (!data) {
          throw new NotFoundException(`Starship ${DTO} was not found`)
        } else {
          return data
        }
      })
    }))

    const species = await Promise.all(createFilmDto.species.map(async (DTO) => {
      return await this.speciesRepository.findOne({
        where: { name: DTO }
      }).then((data) => {
        if (!data) {
          throw new NotFoundException(`Specie ${DTO} was not found`)
        } else {
          return data
        }
      })
    }))

    const planets = await Promise.all(createFilmDto.planets.map(async (DTO) => {
      return await this.planetsRepository.findOne({
        where: { name: DTO }
      }).then((data) => {
        if (!data) {
          throw new NotFoundException(`Film ${DTO} was not found`)
        } else {
          return data
        }
      })
    }))

    try {
      Object.assign(film, { planets, vehicles, starships, species, characters })
      return this.filmsRepository.save(film);
    } catch (error) {
      throw new InternalServerErrorException("Failed to create a new film")
    }
  }

  findAll() {
    return `This action returns all films`;
  }

  findOne(id: number) {
    return `This action returns a #${id} film`;
  }

  async update(id: number, updateFilmDto: UpdateFilmDto) {
    const obj = await this.transform(updateFilmDto)
    try {
      await this.filmsRepository.update(id, obj);
      return this.findOne(id);
    } catch (error) {

      throw new InternalServerErrorException(`Was not able to update the film with ID ${id}`)
    }
  }

  async transform(dto: UpdateFilmDto) {
    const film = new TransformFilmDto
    const planets = dto.planets?.map(async (DTO) => {
      return await this.planetsRepository.findOne({
        where: { name: DTO }
      }).then((data) => {
        if (!data) {
          throw new NotFoundException(`The planet ${DTO} was not found`)
        } else {
          return data
        }
      })
    })

    const vehicles = dto.vehicles?.map(async (DTO) => {
      return await this.vehicleRepository.findOne({
        where: { name: DTO }
      }).then((data) => {
        if (!data) {
          throw new NotFoundException(`The vehicle ${DTO} was not found`)
        } else {
          return data
        }
      })
    })

    const starships = dto.starships?.map(async (DTO) => {
      return await this.starshipRepository.findOne({
        where: { name: DTO }
      }).then((data) => {
        if (!data) {
          throw new NotFoundException(`The starship ${DTO} was not found`)
        } else {
          return data
        }
      })
    })

    const species = dto.species?.map(async (DTO) => {
      return await this.speciesRepository.findOne({
        where: { name: DTO }
      }).then((data) => {
        if (!data) {
          throw new NotFoundException(`The specie ${DTO} was not found`)
        } else {
          return data
        }
      })
    })

    const people = dto.characters?.map(async (DTO) => {
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

    Promise.all([planets, people, species, vehicles, starships]);

    Object.assign(film, dto, { characters: people, planets, starships, species, vehicles })
    return film
  }

  remove(id: number) {
    return `This action removes a #${id} film`;
  }
}
