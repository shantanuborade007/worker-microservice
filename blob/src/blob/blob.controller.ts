/* eslint-disable prettier/prettier */
import { Controller, Post,Body } from '@nestjs/common';
import { BlobService } from './blob.service';


@Controller()
export class BlobController {
    constructor(
        private readonly blobService: BlobService
    ){}

    @Post('api/v1/blob')
    async createJob(@Body() body:any){
        return this.blobService.createJob(body);
    }
}
