import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserRO } from './userDTO';

@Entity('user')
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  fullName: string;

  @Column()
  phoneNumber: string;

  @Column('text')
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponseObject(showToken: boolean = true): UserRO{
    const {id, email, fullName, phoneNumber, token} = this;
    const responseObject: any = {id, email, fullName, phoneNumber};
    if(showToken){
      responseObject.token = token;
      // TODO
    }
    return responseObject;
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  private get token() {
    const {id, email} = this;
    return jwt.sign(
      {
        id,
        email,
      },
      'SecretKey', { expiresIn: '7d'},
    );
  }
}
