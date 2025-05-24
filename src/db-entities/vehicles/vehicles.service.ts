import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from 'src/films/entities/film.entity';
import { Person } from 'src/people/entities/person.entity';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { TransformVehicleDto } from './dto/transfortm-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
    @InjectRepository(Person)
    private peopleRepository: Repository<Person>,
  ) { }

  async create(createVehicleDto: CreateVehicleDto) {
    const vehicle = new Vehicle()
    Object.assign(vehicle, createVehicleDto)

    const people = await Promise.all(createVehicleDto.pilots.map(async (DTO) => {
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

    const films = await Promise.all(createVehicleDto.pilots.map(async (DTO) => {
      await this.filmsRepository.findOne({
        where: { title: DTO }
      }).then((data) => {
        if (!data) {
          throw new NotFoundException(`Planet ${DTO} was not found`)
        } else {
          return data;
        }
      })
    }))

    try {
      Object.assign(vehicle, { pilots: people, films })
      return this.vehicleRepository.save(vehicle);
    } catch (error) {
      throw new InternalServerErrorException("Failed to create a new vehicle")
    }

  }

  async findAll() {
    const vehicles = await this.vehicleRepository.find({}).then((data) => {
      return data.slice(data.length - 10, data.length)
    })

    return vehicles;
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicle`;
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    const obj = await this.transform(updateVehicleDto)
    try {
      await this.vehicleRepository.update(id, obj);
      return this.findOne(id);
    } catch (error) {

      throw new InternalServerErrorException(`Was not able to update the vehicle with ID ${id}`)
    }
  }

  async transform(dto: UpdateVehicleDto) {
    const vehicle = new TransformVehicleDto

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

    Object.assign(vehicle, dto, { pilots: people, films })
    return vehicle
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
