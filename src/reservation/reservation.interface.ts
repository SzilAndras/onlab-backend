export class ReservationInterface {
  readonly userID: number;
  readonly vehichleType: string;
  readonly platenumber: string;
  readonly vin: string;
  readonly works: Array<{work: string, time: string, price: number}>;
  readonly appointment: {day: string, time: string[]};
  readonly commments: Array<{authorId: number, content: string}>;
  readonly state: string;
  readonly suggestedApointment: {day: string, time: string[]};
  readonly reservationId: number;
}
