import { DomainEventBase } from '@common/shared/domain/events/base-domain-event.interface';
import { UserAggregateRoot } from '@src/modules/user-registration/domain/aggregates/base-user.aggregate-root';

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
