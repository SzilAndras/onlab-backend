import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity()
export class Work {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
   work: string;

  @Column()
   time: number; // min

  @Column()
   price: number;

  @Column({
    type: 'enum',
    enum: ['Pending', 'Accepted'],
    default: 'Pending',
  })
   state: string; // TODO Pending, Accepted

  @ManyToOne(type => Reservation, reservation => reservation.works)
  reservation: Reservation;

}
