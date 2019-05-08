import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from '../entities/reservation.entity';
import { Repository } from 'typeorm';
import { WorkService } from './work.service';
import { AppointmentService } from './appointment.service';
import { CommentService } from './comment.service';


@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private readonly workService: WorkService,
    private readonly appointmentService: AppointmentService,
    private readonly commentService: CommentService
    ) { }

  async save(reservation: Reservation) {
    Logger.log(reservation);
    return this.reservationRepository.save(reservation);
  }


  async findAll(): Promise<Reservation[]> {
    return await this.reservationRepository.find();
  }

  async findById(id: number): Promise<Reservation> {
    let reservation = new Reservation();
    await this.reservationRepository.findOne(id).then((res) => {
      reservation = res;
    });
    await this.workService.findWorksByResId(id).then((works) => {
      reservation.works = works;
    });
    await this.appointmentService.findAppointmentsByResId(id).then((appointments) => {
      reservation.appointments = appointments;
    });
    await this.commentService.findCommentsByResId(id).then((comments) => {
      reservation.comments = comments;
    });
    return reservation;
  }

  async findByUserId(userId: number): Promise<Reservation[]> {
    return await this.reservationRepository
      .createQueryBuilder('reservation')
      .where('reservation.userId = :id', {id: userId})
      .getMany();
  }

  async findByState(stateT: string): Promise<Reservation[]> {
    return await this.reservationRepository
      .createQueryBuilder('reservation')
      .where('reservation.adminStatus = :adminStatus', {state: stateT})
      .getMany();
  }
}
