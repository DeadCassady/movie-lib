import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import axios from "axios";
import { Repository } from "typeorm";
import { https } from "follow-redirects";
import { User } from "../users/entities/user.entity";
import { Person } from "../db-entities/people/entities/person.entity";
import { Film } from "../db-entities/films/entities/film.entity";
import { Planet } from "../db-entities/planets/entities/planet.entity";
import { Specie } from "../db-entities/species/entities/species.entity";
import { Starship } from "../db-entities/starships/entities/starship.entity";
import { Vehicle } from "../db-entities/vehicles/entities/vehicle.entity";

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
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }
  async onApplicationBootstrap() {
    //   // await this.loadAllData()
  }

  agent = new https.Agent({
    rejectUnauthorized: false
  })

  async loadAllData() {
    const vehiclesUrl = 'https://swapi.dev/api/vehicles'
    const filmsUrl = 'https://swapi.dev/api/films/?page=1'
    const starshipsUrl = 'https://swapi.dev/api/starships/?page=1'
    const planetsUrl = 'https://swapi.dev/api/planets/?page=1'
    const peopleUrl = 'https://swapi.dev/api/people/?page=1'
    const speciesUrl = 'https://swapi.dev/api/species/?page=1'

    console.log("Initializing vehicles..")
    await this.loadVehicles(vehiclesUrl)

    console.log("Initializing films..")
    await this.loadFilms(filmsUrl)

    console.log("Initializing starships..")
    await this.loadStarships(starshipsUrl)

    console.log("Initializing planets..")
    await this.loadPlanets(planetsUrl)

    console.log("Initializing people..")
    await this.loadPeople(peopleUrl)

    console.log("Initializing species..")
    await this.loadSpecies(speciesUrl)


    console.log("Creating admin role")
    const admin = new User()
    Object.assign(admin, { name: "loh", password: "loh", email: "loh", role: "ADMIN" })
    await this.userRepository.save(admin)
    // console.log("Admin created")
  }

  async loadVehicles(url: string) {
    const vehicles = await axios.get(url, { httpsAgent: this.agent }).then(response => response.data)

    const vehicleEntities = await Promise.all(vehicles.results.map((data: Vehicle) => {
      const vehicle = new Vehicle()
      Object.assign(vehicle, data)
      return this.vehicleRepository.save(vehicle)
    }))
    if (vehicles.next) {
      this.loadVehicles(vehicles.next)
    }
    return vehicleEntities.length
  }

  async loadFilms(url: string) {
    const films = await axios.get(url, { httpsAgent: this.agent }).then(response => response.data)

    const filmsEntities = await Promise.all(films.results.map((data: Film) => {
      const film = new Film()
      Object.assign(film, data)
      return this.filmsRepository.save(film)
    }))
    if (films.next) {
      this.loadFilms(films.next)
    }
    return filmsEntities.length
  }

  async loadStarships(url: string) {
    const starships = await axios.get(url, { httpsAgent: this.agent }).then(response => response.data)

    const starshipsEntities = await Promise.all(starships.results.map((data: Starship) => {
      const starship = new Starship()
      Object.assign(starship, data)
      return this.starshipsRepository.save(starship)
    }))
    if (starships.next) {
      this.loadStarships(starships.next)
    }
    return starshipsEntities.length
  }

  async loadPlanets(url: string) {
    const planets = await axios.get(url, { httpsAgent: this.agent }).then(response => response.data)

    const planetsEntities = await Promise.all(planets.results.map((data: Planet) => {
      const planets = new Planet()
      Object.assign(planets, data)
      return this.planetsRepository.save(planets)
    }))
    if (planets.next) {
      this.loadPlanets(planets.next)
    }
    return planetsEntities.length
  }

  async loadPeople(url: string) {
    const people = await axios.get(url, { httpsAgent: this.agent }).then(response => response.data)

    const peopleEntities = await Promise.all(people.results.map(async (data: any) => {
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
    if (people.next) {
      this.loadPeople(people.next)
    }
    return peopleEntities.length

  }

  async loadSpecies(url: string) {
    const species = await axios.get(url, { httpsAgent: this.agent }).then(response => response.data)

    const speciesEntities = await Promise.all(species.results.map(async (data: any) => {
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
    if (species.next) {
      this.loadSpecies(species.next)
    }

    return speciesEntities.length
  }

}

