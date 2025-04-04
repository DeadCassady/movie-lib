import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Starship } from './entities/starship.entity';

@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a starship' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Starship,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  create(@Body() updateStarshipDto: CreateStarshipDto) {
    return this.starshipsService.create(updateStarshipDto);
  }

  @Get()
  @ApiOperation({ summary: 'Returns a list of all starships' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Starship,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findAll() {
    return this.starshipsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns a starship with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Starship identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Starship,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findOne(@Param('id', new ParseIntPipe()) id: string) {
    return this.starshipsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a starship with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Starship identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Starship,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  update(
    @Param('id', new ParseIntPipe()) id: string,
    @Body() updateStarshipDto: UpdateStarshipDto,
  ) {
    return this.starshipsService.update(+id, updateStarshipDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a Starship with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Starship identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Starship,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  remove(@Param('id', new ParseIntPipe()) id: string) {
    return this.starshipsService.remove(+id);
  }
}
