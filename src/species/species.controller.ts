import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Specie } from './entities/species.entity';

@ApiTags('Species')
@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) { }

  @Post()
  @ApiOperation({ summary: 'Creates a Specie' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Specie })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  create(@Body() createSpeciesDto: CreateSpeciesDto) {
    return this.speciesService.create(createSpeciesDto);
  }

  @Get()
  @ApiOperation({ summary: 'Returns a list of all Specie' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Specie })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findAll() {
    return this.speciesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns a Specie with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Specie identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Specie })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findOne(@Param('id', new ParseIntPipe()) id: string) {
    return this.speciesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a Specie with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Specie identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Specie })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  update(
    @Param('id', new ParseIntPipe()) id: string,
    @Body() updateSpeciesDto: UpdateSpeciesDto,
  ) {
    return this.speciesService.update(+id, updateSpeciesDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a Specie with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Specie identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Specie })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  remove(@Param('id', new ParseIntPipe()) id: string) {
    return this.speciesService.remove(+id)
  }
}
