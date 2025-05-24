import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }
  async getUsers() {
    return this.usersService.getAllUsers()
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto)
    return user

  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) throw new NotFoundException("User not found")
    if (user.password === pass) {
      const { password, ...result } = user;
      return this.jwtService.sign(result)
    } else {
      throw new HttpException("Invalid credentials", 401)
    }
  }
}
