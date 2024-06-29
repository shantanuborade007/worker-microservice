/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkerModule } from './worker/worker.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './worker/entity/job.entity';


@Module({
  imports: [WorkerModule,
    TypeOrmModule.forRoot({
      type:'mongodb',
      url:'mongodb://127.0.0.1:27017/farm',
      entities:[Job],
      synchronize:true
    }),
    TypeOrmModule.forFeature([Job]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
