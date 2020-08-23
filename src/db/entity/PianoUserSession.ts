import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { PianoUser } from './PianoUser';

@Entity()
export class PianoUserSession {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false, unique: true, length: 512 })
  token: string;

  @OneToOne(() => PianoUser)
  @JoinColumn()
  pUser: PianoUser;

  @CreateDateColumn()
  createdAt: Date;
}
