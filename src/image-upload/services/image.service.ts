import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateImageDto } from "../dto/create-image.dto";
import { Image } from "../entities/image.entity"
import { Planet } from "src/db-entities/planets/entities/planet.entity";
import { Film } from "src/db-entities/films/entities/film.entity";
import { Specie } from "src/db-entities/species/entities/species.entity";
import { Person } from "src/db-entities/people/entities/person.entity";
import { Vehicle } from "src/db-entities/vehicles/entities/vehicle.entity";
import { Starship } from "src/db-entities/starships/entities/starship.entity";

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
    @InjectRepository(Planet)
    private planetsRepository: Repository<Planet>,
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
    @InjectRepository(Specie)
    private speciesRepository: Repository<Specie>,
    @InjectRepository(Person)
    private peopleRepository: Repository<Person>,
    @InjectRepository(Vehicle)
    private vehiclesRepository: Repository<Vehicle>,
    @InjectRepository(Starship)
    private starshipsRepository: Repository<Starship>
  ) { }
  async create(dto: CreateImageDto) {
    const image = new Image
    Object.assign(image, { filename: dto.filename, originalName: dto.originalName, pathc: dto.path })
    switch (dto.entityType) {
      case 'planet':
        image.planet = await this.planetsRepository.findOne({ where: { name: dto.entityName } }).then((data) => {
          if (data) {
            return data
          } else {
            throw new NotFoundException
          }
        })
      case 'film':
        image.film = await this.filmsRepository.findOne({ where: { title: dto.entityName } }).then((data) => {
          if (data) {
            return data
          } else {
            throw new NotFoundException
          }
        })
      case 'specie':
        image.specie = await this.speciesRepository.findOne({ where: { name: dto.entityName } }).then((data) => {
          if (data) {
            return data
          } else {
            throw new NotFoundException
          }
        })
      case 'person':
        image.person = await this.peopleRepository.findOne({ where: { name: dto.entityName } }).then((data) => {
          if (data) {
            return data
          } else {
            throw new NotFoundException
          }
        })
      case 'starship':
        image.starship = await this.starshipsRepository.findOne({ where: { name: dto.entityName } }).then((data) => {
          if (data) {
            return data
          } else {
            throw new NotFoundException
          }
        })
      case 'vehicle':
        image.vehicle = await this.vehiclesRepository.findOne({ where: { name: dto.entityName } }).then((data) => {
          if (data) {
            return data
          } else {
            throw new NotFoundException
          }
        })

      default:
        break;
    }


    return image
  }
  async findOne(id: number): Promise<Image> {
    const image = await this.imageRepository.findOneBy({ id })
    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`)
    }
    return image
  }

  async remove(id: number): Promise<void> {
    const result = await this.imageRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`image with ID ${id} not found`)
    }
  }
} 
