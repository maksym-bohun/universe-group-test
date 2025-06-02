import { Injectable } from '@nestjs/common';
import { NatsSubscriberService } from './modules/nats-subscriber/nats-subscriber.service';

@Injectable()
export class AppService {
  constructor(private readonly natsSubscriber: NatsSubscriberService) {}

  async onModuleInit() {
    await this.natsSubscriber.subscribe('fb.events.*', async (event) => {
      console.log('Received FB event:', event);
      // TODO: Save to DB
    });
  }
}
