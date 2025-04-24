import { AggregateRootBase } from '@common/shared/domain/aggregate-root.base';
import { VOEmail } from '@common/shared/domain/value-objects/vo-email';
import { VOName } from '@user-registration/domain/value-objects/vo-name';
import { VOLastName } from '@user-registration/domain/value-objects/vo-last-name';
import { VOUuid } from '@common/shared/domain/value-objects/vo-uuid';
import { IPrimitivesUpdate } from '@user-registration/domain/interfaces/primitives-update.interface';

export class UserUpdateAggregateRoot extends AggregateRootBase<VOUuid> {
  private readonly email: VOEmail;
  private readonly name: VOName;
  private readonly lastName: VOLastName;

  constructor(props: {
    id: string;
    email: string;
    name: string;
    lastName: string;
  }) {
    super(new VOUuid(props.id));
    this.email = new VOEmail(props.email);
    this.name = new VOName(props.name);
    this.lastName = new VOLastName(props.lastName);
  }

  public toPrimitives(): IPrimitivesUpdate {
    return {
      id: this.getId() ?? '',
      email: this.getEmail() ?? '',
      name: this.getName() ?? '',
      lastName: this.getLastName() ?? ''
    };
  }

  public getId(): string | undefined {
    return this.id.value;
  }

  public getEmail(): string | undefined {
    return this.email.value;
  }

  public getName(): string | undefined {
    return this.name.value;
  }

  public getLastName(): string | undefined {
    return this.lastName.value;
  }
}
