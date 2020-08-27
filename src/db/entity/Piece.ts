import {
  Entity,
  Column,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PianoUser } from './PianoUser';

@Entity()
export class Piece {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column()
  composer: string;

  @Column()
  level: number;

  @ManyToMany(
    () => PianoUser,
    pastPUsers => pastPUsers.pastPieces,
  )
  pastPUsers: PianoUser[];

  @ManyToMany(
    () => PianoUser,
    futurePUsers => futurePUsers.futurePieces,
  )
  futurePUsers: PianoUser[];
}
