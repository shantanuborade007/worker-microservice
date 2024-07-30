/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Blob {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    encoding: string;

    @Column()
    md5: string;

    @Column()
    content: string;
}
