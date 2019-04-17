import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO, UserRO } from './userDTO';

Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<UserRO[]> {
    const users = await this.userRepository.find();
    return users.map(user => user.toResponseObject(false));
  }

  async login(data: UserDTO): Promise<UserRO> {
    const {email, password} = data;
    const user = await this.userRepository.findOne({where: {email}});
    if(!user || !(await user.comparePassword(password))){
      throw new HttpException('Invalid username/password', HttpStatus.BAD_REQUEST);
    }
    return user.toResponseObject();

  }

  async register(data: UserRO): Promise<UserRO> {
    let user: User = await this.userRepository.findOne({where: {email: data.email}});
    if(user){
      throw new HttpException('Email address already used', HttpStatus.BAD_REQUEST);
    }
    user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return user.toResponseObject();

  }
}
