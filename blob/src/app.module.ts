/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlobModule } from './blob/blob.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blob } from './blob/entity/blob.entity';

@Module({
  imports: [BlobModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5433,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'root',
      database: process.env.POSTGRES_DB || 'farm',
      entities: [Blob],
      synchronize: true, // Set to false in production
    }),
    TypeOrmModule.forFeature([Blob]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
