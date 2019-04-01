import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReservationController } from './reservation/reservation.controller';
import { ReservationService } from './reservation/reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation/reservation.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([Reservation])],
  controllers: [AppController, ReservationController],
  providers: [AppService, ReservationService],
})
export class AppModule {
  /*docker-compose up*/
}
