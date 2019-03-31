import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  readonly reservationId: number;

  @Column()
  readonly userID: number;

  @Column()
  readonly vehichleType: string;

  @Column()
  readonly platenumber: string;

  @Column()
  readonly vin: string;

  @Column()
  readonly works: string /*{work: string, time: string, price: number}*/;

  @Column()
  readonly appointment: string /*{day: string, time: string}*/;

  @Column()
  readonly commments: string /*{authorId: number, content: string}*/;

  @Column()
  readonly state: string;

  @Column()
  readonly suggestedApointment: string /*{day: string, time: string}*/;
}
