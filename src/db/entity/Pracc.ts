import { Entity, Column, ManyToOne } from 'typeorm';
import { Piece } from './Piece';

@Entity()
export class Pracc {
  @ManyToOne(
    type => Piece,
    praccPiece => praccPiece.name,
  )
  praccPiece: Piece;

  @Column()
  mspeed: number;
}
