import { Entity, ObjectIdColumn, Column, ObjectId } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

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

  @Column()
  jobs: string[];
}
