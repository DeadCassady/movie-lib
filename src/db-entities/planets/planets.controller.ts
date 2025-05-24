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
  UseInterceptors,
} from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Planet } from './entities/planet.entity';
import { CustomInterceptors } from 'src/interceptors/custom.interceptors';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags('Planets')
@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) { }

  @Post()
  @ApiOperation({ summary: 'Creates a Planet' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Planet })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(['admin'])
  create(@Body() createPlanetDto: CreatePlanetDto) {
    return this.planetsService.create(createPlanetDto);
  }

  @Get()
  @ApiOperation({ summary: 'Returns a list of all people' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Planet })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UseInterceptors(CustomInterceptors)
  @Roles(['user', 'admin'])
  findAll() {
    return this.planetsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns a Planet with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Planet identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Planet })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UseInterceptors(CustomInterceptors)
  @Roles(['user', 'admin'])
  findOne(@Param('id', new ParseIntPipe()) id: string) {
    return this.planetsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a Planet with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Planet identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Planet })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(['admin'])
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
  @Roles(['admin'])
  remove(@Param('id', new ParseIntPipe()) id: string) {
    return this.planetsService.remove(+id);
  }
}
