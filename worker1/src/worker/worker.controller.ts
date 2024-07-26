import { Controller, Post,Param,Get,Body } from '@nestjs/common';
import { WorkerService } from './worker.service';
import {CreateJobDto} from '../dto/job.dto'


@Controller()
export class WorkerController {
    constructor (private readonly workerService: WorkerService) {}

    @Get('job')
    async getJob(){
      return await this.workerService.getAllJobs()
    }

    @Post('job')
    async createJobWithImage(@Body() createJobDto: CreateJobDto){  
        // console.log(createJobDto)
        const blob = this.workerService.createJob(createJobDto)
        return blob;
    }

    @Get('job/:id')
    async getJobById(@Param('id') id:string){
      console.log("im here in worker",id)
      return this.workerService.getJobById(id)
    }

    @Get('job/status/:id')
    async getJobStatus(@Param('id') id:string){
      console.log("im here in worker",id)
      return this.workerService.getJobStatus(id)
    }


}
