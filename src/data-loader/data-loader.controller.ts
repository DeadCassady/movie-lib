import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DataLoaderService } from "./data-loader.service";
import { Controller, Get, HttpStatus } from "@nestjs/common";


@ApiTags('Data-Loader')
@Controller('Data-Loader')
export class DataLoaderController {
  constructor(private readonly dataLoaderService: DataLoaderService) { }

  @Get()
  @ApiOperation({ summary: 'Loads all data to the database' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  loadAll() {
    return this.dataLoaderService.loadAllData();
  }
}
