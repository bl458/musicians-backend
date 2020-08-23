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

  @Column({ nullable: false, unique: true, length: 256 })
  token: string;

  @OneToOne(() => PianoUser)
  @Column()
  pUser: PianoUser;

  @CreateDateColumn()
  createdAt: Date;
}
