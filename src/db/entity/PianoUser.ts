import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PianoUser {
  @PrimaryGeneratedColumn()
  id: string;
}
