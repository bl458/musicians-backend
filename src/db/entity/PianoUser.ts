import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PianoUser {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  pw: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
