import { Entity, Column } from 'typeorm';
import { BaseModel } from './base.model';

@Entity('users')
export class UserModel extends BaseModel {
  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
