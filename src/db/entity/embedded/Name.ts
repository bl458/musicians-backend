import { Column } from 'typeorm';

export class Name {
  @Column()
  firstName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column()
  lastName: string;
}
