/* eslint-disable prettier/prettier */
import {ObjectIdColumn, Column, ObjectId, Entity } from 'typeorm';

@Entity()
export class Blob {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    encoding:string;

    @Column()
    md5:string;

    @Column()
    content:string

}