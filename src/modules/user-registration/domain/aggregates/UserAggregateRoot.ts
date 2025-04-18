// src/user-registration/domain/aggregates/UserAggregateRoot.ts

import { AggregateRootBase } from '@common/shared/domain/AggregateRootBase';
import { VOEmail } from '@user-registration/domain/value-objects/VOEmail';
import { VOName } from '@user-registration/domain/value-objects/VOName';
import { VOLastName } from '@user-registration/domain/value-objects/VOLastName';
import { UserFoundEvent } from '@user-registration/domain/aggregates/events/UserFoundEvent';
import { VOUuid } from '@user-registration/domain/value-objects/VOUuid';

export class UserAggregateRoot extends AggregateRootBase<VOUuid> {
  private readonly email?: VOEmail;
  private readonly name?: VOName;
  private readonly lastName?: VOLastName;
  // private readonly id?: VOUuid;

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
    // Opcional: solo lanza evento si al menos uno está presente
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
