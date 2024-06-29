/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entity/job.entity';

@Module({
  imports :[
    TypeOrmModule.forFeature([Job])
  ],
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule {}
