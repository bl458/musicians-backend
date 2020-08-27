import { Entity, Column, ManyToMany } from 'typeorm';
import { PianoUser } from './PianoUser';

@Entity()
export class Piece {
  @Column({ unique: true, nullable: false })
  name: string;

  @Column()
  composer: string;

  @Column()
  level: number;

  @ManyToMany(
    () => PianoUser,
    pastUsers => pastUsers.pastPieces,
  )
  pastUsers: PianoUser[];

  @ManyToMany(
    () => PianoUser,
    futureUsers => futureUsers.futurePieces,
  )
  futureUsers: PianoUser[];
}
