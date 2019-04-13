import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { ReservationService } from '../services/reservation.service';
import { Reservation } from '../entities/reservation.entity';

@Controller('reservation')
export class ReservationController {
   constructor(
     private readonly reservationService: ReservationService) {}

   @Post('/save')
  async save(@Body() reservation: Reservation) {
     return this.reservationService.save(reservation);
   }

   @Get('/findAll')
  async findAll(): Promise<Reservation[]> {
     return this.reservationService.findAll();
   }

   @Get('/findById/:id')
  async findById(@Param('id') id: number): Promise<Reservation> {
    return this.reservationService.findById(id);
  }

  @Get('/findByUserId=:id')
  async findUserById(@Param('id') id: number): Promise<Reservation[]> {
    return this.reservationService.findByUserId(id);
  }
}
