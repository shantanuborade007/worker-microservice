/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entity/job.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
const rabbitMqUrl = process.env.RABBITMQ_URL || 'amqp://localhost:5672';

@Module({
  imports :[
    TypeOrmModule.forFeature([Job]),
    ClientsModule.register([
      {
        name: 'WORKER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [rabbitMqUrl],
          queue: 'worker-queue',
        },
      },
    ]),
  ],
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule {}
