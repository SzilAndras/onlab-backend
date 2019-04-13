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
      this.reservationRepository.save(reservation);
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
      Logger.log(reservation);
    });
    await this.appointmentService.findAppointmentsByResId(id).then((appointments) => {
      reservation.appointments = appointments;
      Logger.log(reservation);
    });
    await this.commentService.findCommentsByResId(id).then((comments) => {
      reservation.comments = comments;
      Logger.log(reservation);
    });
    Logger.log(reservation);
    return reservation;
  }

  async findByUserId(userId: number): Promise<Reservation[]> {
    return await this.reservationRepository
      .createQueryBuilder('reservation')
      .where('reservation.userId = :id', {id: userId})
      .getMany();
  }
}
