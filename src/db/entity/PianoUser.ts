import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Name } from './embedded/Name';

import { Piece } from './Piece';
import { Pracc } from './Pracc';

@Entity()
export class PianoUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  pw: string;

  @Column(type => Name)
  name: Name;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(
    () => PianoUser,
    followed => followed.following,
  )
  followed: PianoUser[];

  @ManyToMany(
    () => PianoUser,
    following => following.followed,
  )
  @JoinTable()
  following: PianoUser[];

  @ManyToMany(
    () => Piece,
    pastPieces => pastPieces.pastPUsers,
  )
  @JoinTable()
  pastPieces: Piece[];

  @OneToMany(
    () => Pracc,
    presentPraccs => presentPraccs.praccPUser,
  )
  @JoinColumn()
  presentPraccs: Pracc[];

  @ManyToMany(
    () => Piece,
    futurePieces => futurePieces.futurePUsers,
  )
  @JoinTable()
  futurePieces: Piece[];
}
