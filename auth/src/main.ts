/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';



async function bootstrap() {
  const level:string = process.env.LOG_LEVEL || 'info';
  const app = await NestFactory.create(AppModule,{
    logger: WinstonModule.createLogger({
      level,
      exitOnError:false
    })
  });
  const config = new DocumentBuilder()
  .setTitle('worker farm Api')
  .setDescription('This API provides endpoints for user authentication and job management. Users can sign up, log in, and create jobs with images. Each job can be retrieved by its ID and its status can be checked. The API uses JWT authentication for securing the endpoints.')
  .setVersion('1.0')
  .build()

const document = SwaggerModule.createDocument(app,config)
SwaggerModule.setup('api',app,document);
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
