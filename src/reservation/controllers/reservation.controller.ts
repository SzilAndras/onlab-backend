import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post, UseGuards } from '@nestjs/common';
import { ReservationService } from '../services/reservation.service';
import { Reservation } from '../entities/reservation.entity';
import { AuthGuard } from '../../shared/auth.guard';
import { User } from '../../user/user.decorator';
import { UserService } from '../../user/user.service';

@Controller('reservation')
export class ReservationController {
   constructor(
     private readonly reservationService: ReservationService,
     private userService: UserService) {}

   @Post('/save')
   @UseGuards(new AuthGuard())
  async save(@User() user, @Body() reservation: Reservation ) {
     const userTemp = await this.userService.findOneById(user.id);
     if(!userTemp){
       throw new HttpException('User does not exist!', HttpStatus.BAD_REQUEST);
     }
     // TODO tulajdonos külde vagy admin
     reservation.userId = user.id;
     return this.reservationService.save(reservation);
   }

   @Get('/findAll')
   @UseGuards(new AuthGuard())
  async findAll(): Promise<Reservation[]> {
     return this.reservationService.findAll();
   }

   @Get('/findById/:id')
   @UseGuards(new AuthGuard())
  async findById(@Param('id') id: number): Promise<Reservation> {
    return this.reservationService.findById(id);
  }

  @Get('/findByUser')
  @UseGuards(new AuthGuard())
  async findUserById(@User() user): Promise<Reservation[]> {
    return this.reservationService.findByUserId(user.id);
  }

  @Get('/findByState/:state')
  @UseGuards(new AuthGuard())
  async findByState(@User() user, @Param('state') state: string) {
     if (user.role === 'Admin') {
       return this.reservationService.findByState(state);
     } else {
       throw new HttpException('Access denied', HttpStatus.BAD_REQUEST);
     }
  }
}
