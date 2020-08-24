import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

import { Name } from './embedded/Name';

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

  @CreateDateColumn()
  createdAt: Date;
}
