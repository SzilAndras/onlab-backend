import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post, UseGuards } from '@nestjs/common';
import { ReservationService } from '../services/reservation.service';
import { Reservation } from '../entities/reservation.entity';
import { AuthGuard } from '../../shared/auth.guard';
import { User } from '../../user/user.decorator';
import { UserService } from '../../user/user.service';
import { AppointmentService } from '../services/appointment.service';

@Controller('reservation')
export class ReservationController {
   constructor(
     private readonly reservationService: ReservationService,
     private userService: UserService,
     private appointmentService: AppointmentService) {}

   @Post('/save')
   @UseGuards(new AuthGuard())
  async save(@User() user, @Body() reservation: Reservation ) {
     Logger.log('Save called');
     const userTemp = await this.userService.findOneById(user.id);
     if(!userTemp){
       throw new HttpException('User does not exist!', HttpStatus.BAD_REQUEST);
     }
     // TODO tulajdonos külde vagy admin
     if(userTemp.role !== 'Admin') {
       reservation.userId = user.id;
     }
     return await this.reservationService.save(reservation);
   }

   @Get('/findAll')
   @UseGuards(new AuthGuard())
  async findAll(@User() user): Promise<Reservation[]> {
     if (user.role === 'Admin') {
       return this.reservationService.findAll();
     } else {
       throw new HttpException('Access denied', HttpStatus.BAD_REQUEST);
     }
   }

   @Get('/findById/:id')
   @UseGuards(new AuthGuard())
  async findById(@Param('id') id: number): Promise<Reservation> {
    return await this.reservationService.findById(id);
  }

  @Get('/findByUser')
  @UseGuards(new AuthGuard())
  async findUserById(@User() user): Promise<Reservation[]> {
    return await this.reservationService.findByUserId(user.id);
  }

  @Get('/findByState/:adminStatus')
  @UseGuards(new AuthGuard())
  async findByState(@User() user, @Param('state') state: string) {
     if (user.role === 'Admin') {
       return await this.reservationService.findByState(state);
     } else {
       throw new HttpException('Access denied', HttpStatus.BAD_REQUEST);
     }
  }

  @Post('/confirmReservation')
  @UseGuards(new AuthGuard())
  async confirmReservation(@User() user, @Body() reservation: Reservation ) {
    if (reservation.userId === undefined && reservation.id === undefined){
      throw new HttpException('User or reservation does not exist!', HttpStatus.BAD_REQUEST);
    }
    if (user.role === 'Admin') {
      reservation.adminStatus = 'Accepted';
      for (const app of reservation.appointments){
        if (app.state === 'Selected' ){
          await this.appointmentService.removeAppointment(app).then(
            () => {
              reservation.appointments.splice(reservation.appointments.indexOf(app), 1);
            },
            (error) => {
              Logger.log(error);
            });
        }
      }
      return await this.reservationService.save(reservation);
    } else if (user.role === 'User' && user.id === reservation.userId && reservation.adminStatus === 'Accepted') {
      reservation.userStatus = 'Accepted';
      for (const app of reservation.appointments) {
        if (app.state === 'Suggested') {
          app.state = 'Accepted';
        }
      }
      return await this.reservationService.save(reservation);
    } else {
      throw new HttpException('Access denied', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/suggestReservation')
  @UseGuards(new AuthGuard())
  async suggestReservation(@User() user, @Body() reservation: Reservation ) {
    if (reservation.userId === undefined && reservation.id === undefined){
      throw new HttpException('User or reservation does not exist!', HttpStatus.BAD_REQUEST);
    }
    if (user.role === 'Admin') {
      reservation.adminStatus = 'Accepted';
      reservation.userStatus = 'Pending';
    } else if (user.role === 'User' && user.id === reservation.userId) {
      reservation.userStatus = 'Accepted';
      reservation.adminStatus = 'Pending';
    } else {
      throw new HttpException('Access denied', HttpStatus.BAD_REQUEST);
    }
    for (const app of reservation.appointments) {
      if (app.state === 'Suggested' && app.id !== undefined) {
        await this.appointmentService.removeAppointment(app).then(
          () => {
            reservation.appointments.splice(reservation.appointments.indexOf(app), 1);
          },
          (error) => {
            Logger.log(error);
          });
      }
    }
    return await this.reservationService.save(reservation);
  }

  @Post('/rejectReservation')
  @UseGuards(new AuthGuard())
  async rejectReservation(@User() user, @Body() reservation: Reservation ) {
    if (reservation.userId === undefined && reservation.id === undefined){
      throw new HttpException('User or reservation does not exist!', HttpStatus.BAD_REQUEST);
    }
    if (user.role === 'Admin') {
      reservation.adminStatus = 'Rejected';
    } else if (user.role === 'User' && user.id === reservation.userId) {
      reservation.userStatus = 'Rejected';
    } else {
      throw new HttpException('Access denied', HttpStatus.BAD_REQUEST);
    }
    for (const app of reservation.appointments) {
      if (app.id !== undefined) {
        await this.appointmentService.removeAppointment(app).then(
          () => {
            reservation.appointments.splice(reservation.appointments.indexOf(app), 1);
          },
          (error) => {
            Logger.log(error);
          });
      }
    }
    reservation.appointments = [];
    for (const w of reservation.works){
      w.state = 'Rejected';
    }
    return await this.reservationService.save(reservation);
  }
}
