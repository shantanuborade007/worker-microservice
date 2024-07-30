import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  tenetId: string;

  @Column()
  clientId: string;

  @Column()
  audience: string;

  @Column()
  appId: string;

  @Column("text", { array: true })
  jobs: string[];

}
