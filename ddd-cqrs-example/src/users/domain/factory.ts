import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

import { User, UserImplement, UserProperties } from './user';

export class UserFactory {
  constructor(
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher,
  ) {}

  create(params: { id: string; name: string; email: string }): User {
    return this.eventPublisher.mergeObjectContext(new UserImplement(params));
  }

  reconstitute(properties: UserProperties): User {
    return this.eventPublisher.mergeObjectContext(
      new UserImplement(properties),
    );
  }
}
