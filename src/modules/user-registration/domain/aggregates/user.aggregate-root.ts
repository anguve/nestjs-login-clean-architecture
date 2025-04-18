import { AggregateRootBase } from '@common/shared/domain/aggregate-root.base';
import { VOEmail } from '@user-registration/domain/value-objects/vo-email';
import { VOName } from '@user-registration/domain/value-objects/vo-name';
import { VOLastName } from '@user-registration/domain/value-objects/vo-last-name';
import { UserFoundEvent } from '@user-registration/domain/aggregates/events/user-found.event';
import { VOUuid } from '@user-registration/domain/value-objects/vo-uuid';

export class UserAggregateRoot extends AggregateRootBase<VOUuid> {
  private readonly email?: VOEmail;
  private readonly name?: VOName;
  private readonly lastName?: VOLastName;

  constructor(props: {
    id?: string;
    email?: string;
    name?: string;
    lastName?: string;
  }) {
    super(props.id ? new VOUuid(props.id) : undefined);

    this.email = props.email ? new VOEmail(props.email) : undefined;
    this.name = props.name ? new VOName(props.name) : undefined;
    this.lastName = props.lastName ? new VOLastName(props.lastName) : undefined;
  }

  public searchUser(): void {
    if (this.email || this.name || this.lastName) {
      this.addDomainEvent(new UserFoundEvent(this));
    }
  }

  public toPrimitives(): Record<string, string | undefined> {
    return {
      id: this.getId(),
      email: this.getEmail(),
      name: this.getName(),
      lastName: this.getLastName()
    };
  }

  public getId(): string | undefined {
    return this.id?.value;
  }

  public getEmail(): string | undefined {
    return this.email?.value;
  }

  public getName(): string | undefined {
    return this.name?.value;
  }

  public getLastName(): string | undefined {
    return this.lastName?.value;
  }
}
