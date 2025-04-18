import { DomainEventBase } from '@common/shared/domain/events/IDomainEvent';
import { UserAggregateRoot } from '@user-registration/domain/aggregates/UserAggregateRoot';

export class UserFoundEvent extends DomainEventBase {
  constructor(private readonly user: UserAggregateRoot) {
    super();
  }

  eventName(): string {
    return 'user.found';
  }

  getUser() {
    return this.user;
  }
}
