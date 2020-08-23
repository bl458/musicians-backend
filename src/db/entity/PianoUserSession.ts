import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { PianoUser } from './PianoUser';

@Entity()
export class PianoUserSession {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  token: string;

  @OneToOne(() => PianoUser)
  @Column()
  pUser: PianoUser;

  @CreateDateColumn()
  createdAt: Date;
}
