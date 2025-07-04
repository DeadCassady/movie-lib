import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
import { TransformPersonDto } from './dto/transform-person.dto';
import { Planet } from '../planets/entities/planet.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Starship } from '../starships/entities/starship.entity';
import { Specie } from '../species/entities/species.entity';
import { Film } from '../films/entities/film.entity';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private peopleRepository: Repository<Person>,
    @InjectRepository(Planet)
    private planetRepository: Repository<Planet>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Starship)
    private starshipRepository: Repository<Starship>,
    @InjectRepository(Specie)
    private speciesRepository: Repository<Specie>,
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
  ) { }

  async create(createPersonDto: CreatePersonDto) {
    const person = new Person();

    const planet = await this.planetRepository.findOne({
      where: { name: createPersonDto.homeworld }
    }).then((data) => {
      if (!data) {
        throw new NotFoundException(`Planet ${createPersonDto.homeworld} was not found`)
      } else {
        return data;
      }
    })

    const vehicles = await Promise.all(createPersonDto.vehicles.map(async (DTO) => {
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

    const starships = await Promise.all(createPersonDto.starships.map(async (DTO) => {
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

    const species = await Promise.all(createPersonDto.species.map(async (DTO) => {
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

    const films = await Promise.all(createPersonDto.films.map(async (DTO) => {
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
    person.edited = new Date()
    person.created = new Date()
    try {
      Object.assign(person, createPersonDto, { homeworld: planet, species, films, starships, vehicles })
      return this.peopleRepository.save(person);
    } catch (error) {
      throw new InternalServerErrorException("Failed to create a new person")
    }
  }


  async findAll(): Promise<Person[]> {
    const entities = await this.peopleRepository.find()
    const bounds = [entities.length - 10, entities.length]
    return entities.slice(bounds[0], bounds[1])
  }

  async findOne(id: number): Promise<Person> {
    const person = await this.peopleRepository.findOneBy({ id });
    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }
    return person;
  }


  async update(id: number, updatePersonDto: UpdatePersonDto): Promise<Person> {
    const obj = await this.transform(updatePersonDto)
    try {
      await this.peopleRepository.update(id, obj);
      return this.findOne(id);
    } catch (error) {

      throw new InternalServerErrorException(`Was not able to update the person with ID ${id}`)
    }
  }

  async transform(dto: UpdatePersonDto) {
    const person = new TransformPersonDto

    let planet: Planet | undefined

    if (dto.homeworld) {
      planet = await this.planetRepository.findOne({
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

    const films = dto.films?.map(async (DTO) => {
      return await this.filmsRepository.findOne({
        where: { title: DTO }
      }).then((data) => {
        if (!data) {
          throw new NotFoundException(`The film ${DTO} was not found`)
        } else {
          return data
        }
      })
    })

    Promise.all([planet, films, species, vehicles, starships]);

    Object.assign(person, dto, { homeworld: planet, films, species, vehicles, starships })
    return person
  }



  async remove(id: number): Promise<void> {
    const result = await this.peopleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`perso} not found`);
    }
  }
}

