/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkerModule } from './worker/worker.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './worker/entity/job.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [WorkerModule,
    TypeOrmModule.forRoot({
      type:'mongodb',
      url:'mongodb+srv://user01:user01@cluster0.enjinep.mongodb.net/farm',
      entities:[Job],
      synchronize:true
    }),
    TypeOrmModule.forFeature([Job])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
