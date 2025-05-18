import { Controller, Get, Post, UseGuards, HttpStatus, Body, Res } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './users/dto/create-user.dto';
import { Response } from 'express';

@ApiTags("Auth")
@Controller()
export class AppController {

  constructor(private authService: AuthService) { }

  @Post('register')
  @ApiOperation({ summary: 'Register' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }

  @Post('auth/login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async login(@Body() req: CreateUserDto) {
    console.log(req);
    return this.authService.login(req);
  }

  @Post('auth/logout')
  @UseGuards(JwtAuthGuard)
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
  getProfile() {
    return this.authService.getUsers()
  }

}
