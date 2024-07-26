/* eslint-disable prettier/prettier */
import { Entity, ObjectIdColumn, Column, ObjectId } from 'typeorm';

@Entity()
export class Job {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  imgURL: string;

  @Column()
  userID: string;

  @Column()
  status: string;

  @Column()
  tenetId: string;

  @Column()
  clientId: string;
}