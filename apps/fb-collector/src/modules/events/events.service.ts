import { Injectable, Logger } from '@nestjs/common';
import { FacebookEvent } from '@common/interfaces/event-types.interface';

@Injectable()
export class EventService {
  private readonly logger = new Logger(EventService.name);

  constructor() {
    console.log('PrismaService initialized');
  }

  saveEvent(event: FacebookEvent) {
    // TODO: remove
    console.log('FB event receiver', event.eventId);
  }
}
