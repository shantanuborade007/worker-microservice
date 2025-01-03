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
      type:'mongodb',
      url:'mongodb://127.0.0.1:27017/farm',
      entities:[Blob],
      synchronize:true
    }),
    TypeOrmModule.forFeature([Blob]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
