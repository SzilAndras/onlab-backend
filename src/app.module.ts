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
import { User } from './user/user.entity';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Rating } from './rating/rating.entity';
import { RatingController } from './rating/rating.controller';
import { RatingService } from './rating/rating.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([
      Reservation,
      Appointment,
      Comment,
      Work,
      User,
      Rating
    ])],
  controllers: [
    AppController,
    ReservationController,
    CommentController,
    AppointmentController,
    WorkController,
    UserController,
    RatingController
  ],
  providers: [
    AppService,
    ReservationService,
    WorkService,
    AppointmentService,
    CommentService,
    UserService,
    RatingService
  ],
})
export class AppModule {

  constructor() {}

  /*docker-compose up*/
}
