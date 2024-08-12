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
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'root',
      database: process.env.POSTGRES_DB || 'farm',
      entities: [Job],
      synchronize: true, // Set to false in production
    }),
    TypeOrmModule.forFeature([Job])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
