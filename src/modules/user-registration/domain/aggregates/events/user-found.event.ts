import { DomainEventBase } from '@common/shared/domain/events/base-domain-event.interface';
import { UserAggregateRoot } from '@user-registration/domain/aggregates/user.aggregate-root';

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
