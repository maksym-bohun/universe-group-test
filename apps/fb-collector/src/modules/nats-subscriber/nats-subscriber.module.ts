import { Module } from '@nestjs/common';
import { NatsSubscriberService } from './nats-subscriber.service';

@Module({
  providers: [NatsSubscriberService],
  exports: [NatsSubscriberService],
})
export class NatsSubscriberModule {}
