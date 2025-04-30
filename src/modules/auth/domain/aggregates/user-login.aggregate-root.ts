import { AggregateRootBase } from '@common/shared/domain/aggregate-root.base';
import { VOPassword } from '@common/shared/domain/value-objects/vo-password';
import { IPrimitivesLogin } from '@auth/domain/interfaces/primitives-login.interface';
import { VOUuid } from '@common/shared/domain/value-objects/vo-uuid';
import { VOEmail } from '@common/shared/domain/value-objects/vo-email';

export class UserLoginAggregateRoot extends AggregateRootBase<VOUuid> {
  private readonly email: VOEmail;
  private readonly password: VOPassword;
  /**
   * Creates an instance of UserLoginAggregateRoot.
   * @param props Object containing email and password strings.
   */
  constructor(props: { email: string; password: string }) {
    super();
    this.email = new VOEmail(props.email);
    this.password = new VOPassword(props.password);
  }

  /**
   * Gets the raw password value.
   * @returns password string
   */
  public getPassword(): string {
    return this.password.value;
  }

  /**
   * Gets the raw email value.
   * @returns email string
   */
  public getEmail(): string {
    return this.email.value;
  }

  /**
   * Converts aggregate to primitive representation.
   * Useful for persistence or transfer.
   * @returns object with email and password as strings
   */
  public toPrimitives(): IPrimitivesLogin {
    return {
      email: this.getEmail() ?? '',
      password: this.getPassword() ?? ''
    };
  }
}
