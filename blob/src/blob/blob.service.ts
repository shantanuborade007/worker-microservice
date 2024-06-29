/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blob } from './entity/blob.entity';

@Injectable()
export class BlobService {

     constructor(
        @InjectRepository(Blob) private blobRepository:Repository<Blob>
    ){}

    async createJob(body:any){
        
        const encoding = 'base64';
        const md5 = body.md5;
        const content = body.content;

        const blob = this.blobRepository.create({
            encoding,
            md5,
            content
        })
        return this.blobRepository.save(blob);
    }
}
