import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../entities/appointment.entity';
import { ReservationService } from '../services/reservation.service';

@Controller('appointment')
export class AppointmentController {

  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly reservationService: ReservationService) {}

  @Post('/setAppointmentToResId=:id')
  async addWork(@Param('id') id: number, @Body() appointment: Appointment) {
    this.reservationService.findById(id).then((res) => {
      appointment.reservation = res;
      return this.appointmentService.saveAppointment(appointment);
    });
  }

  @Delete('/deleteAppointment')
  async removeWork(@Body() appointment: Appointment){
    return await this.appointmentService.removeAppointment(appointment);
  }

  @Get('/findAppointmentsResId=:id')
  async findAppointmentsByResId(@Param('id') id: number): Promise<Appointment[]> {
    return await this.appointmentService.findAppointmentsByResId(id);
  }

  @Get('/findAppointmentsByDate=:date')
  async findAppointmentsByDate(@Param('date') date: string): Promise<Appointment[]>{
    return await this.appointmentService.findAppointmentsByDate(date);
  }
}
