import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity()
export class Comment {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  commentNumber: number;

  @Column('text')
  comment: string;

  @ManyToOne(type => Reservation, reservation => reservation.comments)
  reservation: Reservation;
}
