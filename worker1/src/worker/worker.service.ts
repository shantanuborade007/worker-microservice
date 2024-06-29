/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entity/job.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as crypto from 'crypto';
import axios from 'axios';
import { CreateJobDto } from '../dto/job.dto';
const {ObjectId} = require('mongodb');


@Injectable()
export class WorkerService {
    constructor(
        @InjectRepository(Job) private readonly jobRepository: Repository<Job>
    ){}

    async processImage(file: Express.Multer.File): Promise<{ content: string; md5: string }> {
        if (!file) {
          throw new NotFoundException('No image file uploaded');
        }
    
        const buffer = await fs.promises.readFile(file.path);
    
        const content = buffer.toString('base64');
        const md5 = crypto.createHash('md5').update(buffer).digest('hex');
    
        await fs.promises.unlink(file.path); // Clean up temporary file
    
        return { content, md5 };
    }

    async createJob(createJobDto:CreateJobDto){
        // console.log(createJobDto)
        const content = createJobDto.content;
        const md5 = createJobDto.md5
        const user = createJobDto.user
        const status = createJobDto.status ? createJobDto.status : "pending"
        // const{content,md5} = data
        /* now ata ithun blob service la call kar using axios ani tyala  */
        const response = await axios.post('http://localhost:3002/api/v1/blob', {
            content,
            md5
        });
        console.log(response.data.id)
        console.log(user)
        const job = this.jobRepository.create({
            imgURL:response.data.id,
            status,
            userID:user.id,
            tenetId:user.tenetId,
            clientId:user.clientId
        })
        return this.jobRepository.save(job);
    }

    async getJobById(id:string):Promise<Job>{
        const newId = new ObjectId(id)
        return await this.jobRepository.findOne(newId);
    }

    async getJobStatus(id:string){
        const newId = new ObjectId(id)
        const job = await this.jobRepository.findOne(newId);
        return job.status
    }
    


}
