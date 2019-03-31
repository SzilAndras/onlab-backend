import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Reservation } from './reservation.entity';
import { Logger } from '@nestjs/common';

@Controller('reservation')
export class ReservationController {
   constructor(private readonly reservationService: ReservationService) {}

   @Post('/save')
  async save(@Body() reservation: Reservation) {
     Logger.log('create controller');
     this.reservationService.save(reservation);
   }

   @Get('/findAll')
  async findAll(): Promise<Reservation[]> {
     return this.reservationService.findAll();
   }

   @Get('/findById/:id')
  async findById(@Param('id') id: number): Promise<Reservation> {
    return this.reservationService.findById(id);
  }
}
