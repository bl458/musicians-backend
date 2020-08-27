import { Entity, Column, ManyToOne } from 'typeorm';

import { Piece } from './Piece';
import { PianoUser } from './PianoUser';

@Entity()
export class Pracc {
  @ManyToOne(
    () => Piece,
    praccPiece => praccPiece.name,
  )
  praccPiece: Piece;

  @Column()
  mspeed: number;

  @ManyToOne(
    () => PianoUser,
    praccUser => praccUser.presentPracc,
  )
  praccUser: PianoUser;
}
