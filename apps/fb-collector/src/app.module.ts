import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NatsSubscriberModule } from './modules/nats-subscriber/nats-subscriber.module';
import { EventsModule } from './modules/events/events.module';

@Module({
  imports: [NatsSubscriberModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
