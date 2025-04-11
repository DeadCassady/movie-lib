import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import axios from "axios";
import { Film } from "src/films/entities/film.entity";
import { Person } from "src/people/entities/person.entity";
import { Planet } from "src/planets/entities/planet.entity";
import { Specie } from "src/species/entities/species.entity";
import { Starship } from "src/starships/entities/starship.entity";
import { Vehicle } from "src/vehicles/entities/vehicle.entity";
import { Repository } from "typeorm";

@Injectable()
export class DataLoaderService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(Film)
    private readonly filmsRepository: Repository<Film>,
    @InjectRepository(Planet)
    private readonly planetsRepository: Repository<Planet>,
    @InjectRepository(Specie)
    private readonly speciesRepository: Repository<Specie>,
    @InjectRepository(Starship)
    private readonly starshipsRepository: Repository<Starship>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>
  ) { }
  async onApplicationBootstrap() {
    await this.loadAllData()
  }


  async loadAllData() {

    const vehicles = await axios.get('https://swapi.dev/api/vehicles/').then(data => data.data.results)
    const people = await axios.get('https://swapi.dev/api/people/').then(data => data.data.results)
    const films = await axios.get('https://swapi.dev/api/films/').then(data => data.data.results)
    const planets = await axios.get('https://swapi.dev/api/planets/').then(data => data.data.results)
    const species = await axios.get('https://swapi.dev/api/species/').then(data => data.data.results)
    const starships = await axios.get('https://swapi.dev/api/starships/').then(data => data.data.results)

    console.log("Initializing vehicles..")
    const vehicleEntities = await Promise.all(vehicles.map((data: Vehicle) => {
      const vehicle = new Vehicle()
      Object.assign(vehicle, data)
      return this.vehicleRepository.save(vehicle)
    }))
    console.log(`Initialized ${vehicleEntities.length} vehicles`)

    console.log("Initializing films..")
    const filmsEntities = await Promise.all(films.map((data: Film) => {
      const film = new Film()
      Object.assign(film, data)
      return this.filmsRepository.save(film)
    }))
    console.log(`Initialized ${filmsEntities.length} films`)


    console.log("Initializing starships..")
    const starshipsEntities = await Promise.all(starships.map((data: Starship) => {
      const starship = new Starship()
      Object.assign(starship, data)
      return this.starshipsRepository.save(starship)
    }))
    console.log(`Initialized ${starshipsEntities.length} starships`)


    console.log("Initializing planets..")
    const planetsEntities = await Promise.all(planets.map((data: Planet) => {
      const planets = new Planet()
      Object.assign(planets, data)
      return this.planetsRepository.save(planets)
    }))
    console.log(`Initialized ${planetsEntities.length} planets`)


    console.log("Initializing people..")
    const peopleEntities = await Promise.all(people.map(async (data) => {
      const person = new Person()

      const homeworld = await this.planetsRepository.findOneBy({
        url: data.homeworld
      }).then(data => {
        if (data) {
          return data
        } else {
          return null
        }
      })
      Object.assign(person, data, { homeworld })
      return this.personRepository.save(person)
    }))
    console.log(`Initialized ${peopleEntities.length} people`)

    console.log("Initializing species..")
    const speciesEntities = await Promise.all(species.map(async (data) => {
      const specie = new Specie()

      const homeworld = await this.planetsRepository.findOneBy({
        url: data.homeworld
      }).then(data => {
        if (data) {
          return data
        } else {
          return null
        }
      })

      Object.assign(specie, data, { homeworld })
      return this.speciesRepository.save(specie)
    }))
    console.log(`Initialized ${speciesEntities.length} species`)
  }
}

