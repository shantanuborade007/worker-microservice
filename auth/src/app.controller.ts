import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  logger = new Logger('AppController');
  @Get()
  getHello(): string {
    this.logger.log('Hello AppController');
    return this.appService.getHello();
  }
}
