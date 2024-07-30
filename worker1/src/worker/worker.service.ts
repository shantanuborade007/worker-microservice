/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException,Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entity/job.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as crypto from 'crypto';
import axios from 'axios';
import { CreateJobDto } from '../dto/job.dto';
const {ObjectId} = require('mongodb');
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';



@Injectable()
export class WorkerService {
    constructor(
        @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
        @Inject('WORKER_SERVICE') private client: ClientProxy
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
        
        const response = await lastValueFrom(
            this.client.send('sending_job',
                { content, md5 })
            )
        console.log('safe till here !')
        
        const job = this.jobRepository.create({
            imgURL:response.id,
            status,
            userID:user.id,
            tenetId:user.tenetId,
            clientId:user.clientId
        })
        return this.jobRepository.save(job);
        
    }

    async getJobById(id:string):Promise<Job>{
        const newId = id
        return await this.jobRepository.findOne({where:{id:newId}});
    }

    async getJobStatus(id:string){
        const newId = id
        const job = await this.jobRepository.findOne({where:{id:newId}});
        return job.status
    }

    async getAllJobs(){
        return await this.jobRepository.find();
    }
    


}
