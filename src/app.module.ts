import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReservationController } from './reservation/controllers/reservation.controller';
import { ReservationService } from './reservation/services/reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation/entities/reservation.entity';
import { Appointment } from './reservation/entities/appointment.entity';
import { Work } from './reservation/entities/work.entity';
import { Comment } from './reservation/entities/comment.entity';
import { WorkService } from './reservation/services/work.service';
import { AppointmentService } from './reservation/services/appointment.service';
import { CommentService } from './reservation/services/comment.service';
import { CommentController } from './reservation/controllers/comment.controller';
import { AppointmentController } from './reservation/controllers/appointment.controller';
import { WorkController } from './reservation/controllers/work.controller';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([Reservation, Appointment, Comment, Work])],
  controllers: [AppController, ReservationController, CommentController, AppointmentController, WorkController],
  providers: [AppService, ReservationService, WorkService, AppointmentService, CommentService],
})
export class AppModule {

  constructor() {}

  /*docker-compose up*/
}
