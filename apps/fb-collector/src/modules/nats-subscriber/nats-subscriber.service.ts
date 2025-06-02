import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { connect, NatsConnection, Subscription } from 'nats';

@Injectable()
export class NatsSubscriberService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(NatsSubscriberService.name);
  private nc: NatsConnection;
  private subscriptions: Subscription[] = [];

  async onModuleInit() {
    this.nc = await connect({
      servers: process.env.NATS_URL || 'nats://localhost:4222',
    });
    this.logger.log('Connected to NATS');

    await this.subscribe('fb.events.top', this.handleTopEvent.bind(this));
    await this.subscribe('fb.events.bottom', this.handleBottomEvent.bind(this));
  }

  async onModuleDestroy() {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
    await this.nc?.drain();
    await this.nc?.close();
    this.logger.log('Disconnected from NATS');
  }

  async subscribe(subject: string, handler: (data: any) => void) {
    const sub = this.nc.subscribe(subject);
    this.subscriptions.push(sub);

    this.logger.log(`Subscribed to ${subject}`);

    (async () => {
      for await (const msg of sub) {
        try {
          const data = JSON.parse(msg.data.toString());
          handler(data);
        } catch (err) {
          this.logger.error(`Error handling message from ${subject}:`, err);
        }
      }
    })();
  }

  private handleTopEvent(data: any) {
    this.logger.log(`[fb.events.top] Received data: ${JSON.stringify(data)}`);
    this.processFbEvent(data);
  }

  private handleBottomEvent(data: any) {
    this.logger.log(
      `[fb.events.bottom] Received data: ${JSON.stringify(data)}`,
    );
    this.processFbEvent(data);
  }

  private processFbEvent(event: any) {
    this.logger.log(`Received FB event: ${JSON.stringify(event)}`);
    // TODO: save to the db
  }
}
