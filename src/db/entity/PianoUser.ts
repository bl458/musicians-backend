import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Name } from './embedded/Name';
import { Piece } from './Piece';
import { Pracc } from './Pracc';

@Entity()
export class PianoUser {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  pw: string;

  @Column(type => Name)
  name: Name;

  @ManyToMany(
    type => Piece,
    pastPieces => pastPieces.pastUsers,
  )
  @JoinTable()
  pastPieces: Piece[];

  @Column(type => Pracc)
  presentPracc: Pracc[];

  @ManyToMany(
    type => Piece,
    futurePieces => futurePieces.futureUsers,
  )
  @JoinTable()
  futurePieces: Piece[];

  @CreateDateColumn()
  createdAt: Date;
}
