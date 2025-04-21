import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specie } from 'src/species/entities/species.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Person } from 'src/people/entities/person.entity';
import { Film } from 'src/films/entities/film.entity';
import { Image } from 'src/image-upload/entities/image.entity'
import { ImagesController } from './image.controller';
import { ImageService } from './services/image.service';
import { FileStorage } from './services/file-storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image, Person, Planet, Starship, Vehicle, Specie, Film])],
  controllers: [ImagesController],
  providers: [ImageService, FileStorage],
})
export class ImageModule { }
