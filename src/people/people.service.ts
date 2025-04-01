import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
import { Planet } from 'src/planets/entities/planet.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Specie } from 'src/species/entities/species.entity';
import { Film } from 'src/films/entities/film.entity';
import { TransformPersonDto } from './dto/transform-person.dto';

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
        return createPersonDto.homeworld
      } else {
        return data;
      }
    })

    const vehicles = createPersonDto.vehicles.map(async (DTO) => {
      return await this.vehicleRepository.findOne({
        where: { name: DTO }
      }).then((data) => {
        if (!data) {
          return DTO
        } else {
          return data
        }
      })
    })

    const starships = createPersonDto.starships.map(async (DTO) => {
      return await this.starshipRepository.findOne({
        where: { name: DTO }
      }).then((data) => {
        if (!data) {
          return DTO
        } else {
          return data
        }
      })
    })

    const species = createPersonDto.species.map(async (DTO) => {
      return await this.speciesRepository.findOne({
        where: { name: DTO }
      }).then((data) => {
        if (!data) {
          return DTO
        } else {
          return data
        }
      })
    })

    const films = createPersonDto.films.map(async (DTO) => {
      return await this.filmsRepository.findOne({
        where: { title: DTO }
      }).then((data) => {
        if (!data) {
          return DTO
        } else {
          return data
        }
      })
    })
Promise.all([planet, vehicles, starships, species, films])
    Object.assign(person, createPersonDto, { homeworld: planet, vehicles: vehicles, starships: starships, species: species, films: films })

    return this.peopleRepository.save(person);
  }

  findAll(): Promise<Person[]> {

    return this.peopleRepository.find();
  }

  async findOne(id: number): Promise<Person> {
    const person = await this.peopleRepository.findOneBy({ id });
    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }
    return person;
  }


  async update(id: number, updatePersonDto: UpdatePersonDto): Promise<Person> {
    const obj = this.transform(updatePersonDto)
    const person = new TransformPersonDto()
    Object.assign(person, obj)
    await this.peopleRepository.update(id, person);
    return this.findOne(id);
  }

  async transform(dto: UpdatePersonDto) {
    let planet: Planet | string | undefined

    if (dto.homeworld) {
      planet = await this.planetRepository.findOne({
        where: { name: dto.homeworld }
      })
        .then((data) => {
          if (!data) {
            return dto.homeworld || '';
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
          return DTO
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
          return DTO
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
          return DTO
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
          return DTO
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
    const result = await this.peopleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`dto with ID ${id} not found`);
    }
  }
}

