import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Film } from './entities/film.entity';

@ApiTags("Films")
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) { }

  @Post()
  @ApiOperation({ summary: 'Creates a film' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Film })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.create(createFilmDto);
  }

  @Get()
  @ApiOperation({ summary: 'Returns a list of all films' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Film })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findAll() {
    return this.filmsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns a Film with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Film identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Film })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findOne(@Param('id', new ParseIntPipe()) id: string) {
    return this.filmsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a Film with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Film identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Film })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  update(
    @Param('id', new ParseIntPipe()) id: string,
    @Body() updateFilmDto: UpdateFilmDto,
  ) {
    return this.filmsService.update(+id, updateFilmDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a Film with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Film identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Film })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  remove(@Param('id', new ParseIntPipe()) id: string) {
    return this.filmsService.remove(+id)
  }
}
