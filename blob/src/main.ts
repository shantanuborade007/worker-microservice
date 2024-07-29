import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const rabbitMQUrl = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
  console.log(`Connecting to RabbitMQ at ${rabbitMQUrl}`);
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [rabbitMQUrl],
        queue: 'worker-queue',
      },
    },
  );
  app.listen();
}
bootstrap();
