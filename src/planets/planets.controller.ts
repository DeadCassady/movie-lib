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
import { PlanetsService } from './planets.service';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Planet } from './entities/planet.entity';

@ApiTags('Planets')
@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a Planet' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Planet })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  create(@Body() createPlanetDto: CreatePlanetDto) {
    return this.planetsService.create(createPlanetDto);
  }

  @Get()
  @ApiOperation({ summary: 'Returns a list of all people' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Planet })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findAll() {
    return this.planetsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns a Planet with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Planet identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Planet })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findOne(@Param('id', new ParseIntPipe()) id: string) {
    return this.planetsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a Planet with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Planet identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Planet })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  update(
    @Param('id', new ParseIntPipe()) id: string,
    @Body() updatePlanetDto: UpdatePlanetDto,
  ) {
    return this.planetsService.update(+id, updatePlanetDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a Planet with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Planet identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Planet })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  remove(@Param('id', new ParseIntPipe()) id: string) {
    return this.planetsService.remove(+id);
  }
}
