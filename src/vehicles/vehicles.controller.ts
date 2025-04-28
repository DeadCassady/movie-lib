import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Vehicle } from './entities/vehicle.entity';
import { CustomInterceptors } from 'src/interceptors/custom.interceptors';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) { }

  @Post()
  @ApiOperation({ summary: 'Creates a Vehicle' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Vehicle })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Returns a list of all Vehicle' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Vehicle })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UseInterceptors(CustomInterceptors)
  findAll() {
    return this.vehiclesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns a Vehicle with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Vehicle identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Vehicle })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UseInterceptors(CustomInterceptors)
  findOne(@Param('id', new ParseIntPipe()) id: string) {
    return this.vehiclesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a Vehicle with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Vehicle identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Vehicle })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  update(
    @Param('id', new ParseIntPipe()) id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return this.vehiclesService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a Vehicle with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Vehicle identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Vehicle })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  remove(@Param('id', new ParseIntPipe()) id: string) {
    return this.vehiclesService.remove(+id)
  }
}
