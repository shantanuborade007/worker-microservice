/* eslint-disable prettier/prettier */
import { Controller, Post,Body } from '@nestjs/common';
import { BlobService } from './blob.service';
import { EventPattern, Payload } from '@nestjs/microservices';


@Controller()
export class BlobController {
    constructor(
        private readonly blobService: BlobService
    ){}

    @Post('api/v1/blob')
    async createJob(@Body() body:any){
        return this.blobService.createJob(body);
    }

    @EventPattern('sending_job')
    async createJob1(@Payload() body: any){
        return await this.blobService.createJob(body);
    }
}
