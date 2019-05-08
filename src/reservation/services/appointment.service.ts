import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';

Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) { }

  async saveAppointment(appointment: Appointment){
    appointment.day.setHours(0, 0, 0, 0);
    return this.appointmentRepository.save(appointment);
  }

  async removeAppointment(appointment: Appointment) {
    return this.appointmentRepository.remove(appointment);
  }

  async findAppointmentsByResId(reId: number): Promise<Appointment[]> {
    return await this.appointmentRepository
      .createQueryBuilder('appointment')
      .where('appointment.reservationId = :id', { id: reId })
      .getMany();
  }

  async findAppointmentsByDate(dstr: string): Promise<Appointment[]>{
    Logger.log('dstr:  ' + dstr);
    let dddd = new Date(dstr);
    dddd.setHours(0, 0, 0, 0);
    let dddd2 = new Date();
    dddd2.setHours(0, 0, 0, 0);
    dddd2.setDate(dddd.getDate() + 1);
    /*Logger.log('dddd:  ' + dddd);
    Logger.log('dddd2:  ' + dddd2);*/
    return await this.appointmentRepository
      .createQueryBuilder('appointment')
      .where('appointment.day >= :ddd AND appointment.day < :ddd2', {ddd: dddd, ddd2: dddd2})
      .getMany();
  }

}
