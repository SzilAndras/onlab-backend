import { Body, Controller, Get, HttpException, HttpStatus, Logger, Post, UseGuards } from '@nestjs/common';
import { RatingService } from './rating.service';
import { AuthGuard } from '../shared/auth.guard';
import { User } from '../user/user.decorator';
import { Reservation } from '../reservation/entities/reservation.entity';
import { Rating } from './rating.entity';
import { UserService } from '../user/user.service';

@Controller('rating')
export class RatingController{

  constructor(
    private ratingService: RatingService,
    private userService: UserService,
  ) {}

  @Post('/save')
  @UseGuards(new AuthGuard())
  async save(@User() user, @Body() rating: Rating ) {
    const userTemp = await this.userService.findOneById(user.id);
    if (!userTemp) {
      throw new HttpException('User does not exist!', HttpStatus.BAD_REQUEST);
    }
    if (userTemp.role === 'User') {
      rating.authorId = user.id;
      return await this.ratingService.save(rating);
    } else {
      throw new HttpException('Access denied', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/findAll')
  async findAll() {
    return await this.ratingService.findAll();
  }
}
