import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  readonly reservationId: number;

  @Column()
  readonly userId: number;

  @Column()
  readonly vehicleType: string;

  @Column()
  readonly plateNumber: string;

  @Column()
  readonly vin: string;

  @Column()
  readonly works: string /*{work: string, time: string, price: number}*/;

  @Column()
  readonly appointment: Date /*{day: string, time: string}*/;

  @Column()
  readonly comments: string /*{authorId: number, content: string}*/;

  @Column()
  readonly state: string;

  @Column()
  readonly suggestedAppointment: string /*{day: string, time: string}*/;
}
