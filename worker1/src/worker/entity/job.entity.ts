/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
