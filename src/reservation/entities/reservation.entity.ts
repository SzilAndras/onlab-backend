import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Appointment } from './appointment.entity';
import { Comment } from './comment.entity';
import { Work } from './work.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  vehicleType: string;

  @Column()
  plateNumber: string;

  @Column()
  vin: string;

  @Column({
    type: 'enum',
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending',
  })
  adminStatus: string;

  @Column({
    type: 'enum',
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending',
  })
  userStatus: string;

  @OneToMany(type => Appointment, appointment => appointment.reservation, {
    cascade: true,
  })
  appointments: Appointment[];

  @OneToMany(type => Comment, comment => comment.reservation, {
    cascade: true,
  })
  comments: Comment[];

  @OneToMany(type => Work, work => work.reservation, {
    cascade: true,
  })
  works: Work[];
}
