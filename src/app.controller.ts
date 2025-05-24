import { Controller, Get, Post, HttpStatus, Body, Res, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './users/dto/create-user.dto';
import { Response } from 'express';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@ApiTags("Auth")
@Controller()
export class AppController {

  constructor(private authService: AuthService) { }

  @Post('register')
  @ApiOperation({ summary: 'Register' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async register(@Body() dto: CreateUserDto) {
    const user = this.authService.register(dto);
    return user
  }

  @Post('auth/login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async login(@Body() dto: CreateUserDto) {
    return this.authService.validateUser(dto.name, dto.password);
  }

  @Post('auth/logout')
  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt')
    return { message: "Logout successful" }
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Returns a profile' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  getProfile(@Req() req: Request) {
    return this.authService.getUsers()
  }

}
