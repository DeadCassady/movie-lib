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
  UseGuards,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Person } from './entities/person.entity';
import { CustomInterceptors } from 'src/interceptors/custom.interceptors';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/users/roles/roles.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('People')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) { }

  @Post()
  @ApiOperation({ summary: 'Creates a person' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Person })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN)
  create(@Body() createPersonDto: CreatePersonDto) {
    // return this.peopleService.create(createPersonDto);
    return "Ya loh"
  }

  @Get()
  @ApiOperation({ summary: 'Returns a list of all people' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Person })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UseInterceptors(CustomInterceptors)
  @Roles(Role.USER, Role.ADMIN)
  findAll() {
    return this.peopleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns a person with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'person identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Person })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UseInterceptors(CustomInterceptors)
  @Roles(Role.ADMIN, Role.USER)
  findOne(@Param('id', new ParseIntPipe()) id: string) {
    return this.peopleService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a person with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'person identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Person })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN)
  update(
    @Param('id', new ParseIntPipe()) id: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ) {
    return this.peopleService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a person with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'person identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Person })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN)
  remove(@Param('id', new ParseIntPipe()) id: string) {
    return this.peopleService.remove(+id)
  }
}
