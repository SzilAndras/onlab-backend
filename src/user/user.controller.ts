import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO, UserRO } from './userDTO';

@Controller('user')
export class UserController {

  constructor(private userService: UserService) {}

  @Get('users')
  findAll(){
    return this.userService.findAll();
  }

  @Post('login')
  login(@Body() data: UserDTO){
    return this.userService.login(data);
  }

  @Post('register')
  register(@Body() data: UserRO){
    return this.userService.register(data);
  }
}