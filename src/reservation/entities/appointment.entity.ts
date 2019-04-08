import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day: Date;

  @Column()
  time: string; // TODO

  @Column({
    type: 'enum',
    enum: ['Selected', 'Suggested', 'Accepted'],
    default: 'Selected',
  })
  state: string;

  @Column({
    type: 'enum',
    enum: ['Takeover', 'Work', 'Handover'],
    default: 'Takeover',
  })
  type: string; // Takeover, Work, Handover

  @ManyToOne(type => Reservation, reservation => reservation.appointments)
  reservation: Reservation;

}
