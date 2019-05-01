import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO, UserRO } from './userDTO';
import { AuthGuard } from '../shared/auth.guard';
import { User } from './user.decorator';

@Controller('user')
export class UserController {

  constructor(private userService: UserService) {}

  @Get('users')
  @UseGuards(new AuthGuard())
  async findAll(@User() user) {
    if (user.role === 'Admin') {
      return await this.userService.findAll();
    } else {
      return new HttpException('Permission denied', HttpStatus.FORBIDDEN);
    }
  }

  @Get('findUserById=:id')
  @UseGuards(new AuthGuard())
  async findById(@User() user, @Param('id') id: number) {
    if (user.role === 'Admin') {
      return await this.userService.findOneById(id);
    } else {
      return new HttpException('Permission denied', HttpStatus.FORBIDDEN);
    }
  }

  @Post('login')
  login(@Body() data: UserDTO){
    return this.userService.login(data);
  }

  @Post('register')
  register(@Body() data: UserRO) {
    return this.userService.register(data);
  }
}