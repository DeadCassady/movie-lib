import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe, UseInterceptors, UseGuards } from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Film } from './entities/film.entity';
import { CustomInterceptors } from 'src/interceptors/custom.interceptors';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/users/roles/roles.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags("Films")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) { }

  @Post()
  @ApiOperation({ summary: 'Creates a film' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Film })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN)
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.create(createFilmDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Returns a list of all films' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Film })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UseInterceptors(CustomInterceptors)
  @Roles(Role.ADMIN, Role.USER)
  findAll() {
    return this.filmsService.findAll();
  }
  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Returns a Film with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Film identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Film })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UseInterceptors(CustomInterceptors)
  @Roles(Role.USER, Role.ADMIN)
  findOne(@Param('id', new ParseIntPipe()) id: string) {
    return this.filmsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a Film with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Film identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Film })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN)
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
  @Roles(Role.ADMIN)
  remove(@Param('id', new ParseIntPipe()) id: string) {
    return this.filmsService.remove(+id)
  }
}
