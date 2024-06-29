import { Module } from '@nestjs/common';
import { BlobController } from './blob.controller';
import { BlobService } from './blob.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blob } from './entity/blob.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Blob])],
  controllers: [BlobController],
  providers: [BlobService]
})
export class BlobModule {}
