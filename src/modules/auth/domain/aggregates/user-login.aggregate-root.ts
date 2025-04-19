import { AggregateRootBase } from '@common/shared/domain/aggregate-root.base';
import { VOPassword } from '@auth/domain/value-objects/vo-password';
import { IPrimitivesLogin } from '@auth/domain/interfaces/primitives-login.interface';
import { VOUuid } from '@auth/domain/value-objects/vo-uuid';
import { VOEmail } from '@auth/domain/value-objects/vo-email';

export class UserLoginAggregateRoot extends AggregateRootBase<VOUuid> {
  private readonly email: VOEmail;
  private readonly password: VOPassword;

  constructor(props: { email: string; password: string }) {
    super();
    this.email = new VOEmail(props.email);
    this.password = new VOPassword(props.password);
  }

  public toPrimitives(): IPrimitivesLogin {
    return {
      email: this.getEmail() ?? '',
      password: this.getPassword() ?? ''
    };
  }

  public getId(): string {
    return this.id.value;
  }

  public getPassword(): string {
    return this.password.value;
  }

  public getEmail(): string {
    return this.email.value;
  }
}
