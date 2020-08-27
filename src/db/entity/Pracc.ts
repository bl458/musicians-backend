import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Piece } from './Piece';
import { PianoUser } from './PianoUser';

@Entity()
export class Pracc {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Piece,
    praccPiece => praccPiece.name,
  )
  praccPiece: Piece;

  @Column()
  mspeed: number;

  @ManyToOne(
    () => PianoUser,
    praccPUser => praccPUser.presentPraccs,
  )
  praccPUser: PianoUser;
}
