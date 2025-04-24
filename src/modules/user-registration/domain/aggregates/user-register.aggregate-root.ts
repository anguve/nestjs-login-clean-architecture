import { AggregateRootBase } from '@common/shared/domain/aggregate-root.base';
import { VOEmail } from '@common/shared/domain/value-objects/vo-email';
import { VOName } from '@user-registration/domain/value-objects/vo-name';
import { VOLastName } from '@user-registration/domain/value-objects/vo-last-name';
import { VOUuid } from '@common/shared/domain/value-objects/vo-uuid';
import { IPrimitivesRegister } from '@user-registration/domain/interfaces/primitives-register.interface';
import { VOPassword } from '@common/shared/domain/value-objects/vo-password';

export class UserRegisterAggregateRoot extends AggregateRootBase<VOUuid> {
  private readonly email: VOEmail;
  private readonly name: VOName;
  private readonly lastName: VOLastName;
  private readonly password: VOPassword;

  constructor(props: {
    email: string;
    name: string;
    lastName: string;
    password: string;
  }) {
    super();
    this.email = new VOEmail(props.email);
    this.name = new VOName(props.name);
    this.lastName = new VOLastName(props.lastName);
    this.password = new VOPassword(props.password);
  }

  public toPrimitives(): IPrimitivesRegister {
    return {
      email: this.getEmail() ?? '',
      name: this.getName() ?? '',
      lastName: this.getLastName() ?? '',
      password: this.getPassword() ?? ''
    };
  }

  public getId(): string | undefined {
    return this.id.value;
  }

  public getPassword(): string | undefined {
    return this.password.value;
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
