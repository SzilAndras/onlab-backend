import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  points: number;

  @Column()
  description: string;

  @Column()
  authorId: number;
}
